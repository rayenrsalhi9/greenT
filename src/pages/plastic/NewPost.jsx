/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react"
import { redirect, Form, useActionData, useNavigation } from "react-router-dom"
import { auth } from "../../config/firebase"
import { states, cities } from "../../utils/locations"
import { Upload, Camera, Trash2, Milk, ShoppingBag, Recycle, Loader2 } from "lucide-react"
import { serverTimestamp } from "firebase/firestore"
import { sharePost } from '../../firebase/sharePost'
import { useTranslation } from "react-i18next"
import "./new-post.css"

export async function loader() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        resolve(redirect('/login?message=You have to log in to proceed'))
      } else {
        resolve(null)
      }
      unsubscribe()
    })
  })
}

export async function action({ request }) {
  const formData = await request.formData();
  const {
    title,
    description,
    city,
    state,
    role,
    bottles = 0,
    bags = 0,
    mixed = 0,
  } = Object.fromEntries(formData);

  const errors = {};

  // Validate required fields
  if (!title) errors.title = "Title is required";
  if (!state) errors.state = "State is required";
  if (!city) errors.city = "City is required";
  if (!description) errors.description = "Description is required";
  if (!role) errors.role = "Role is required";

  // Additional validation for provider role
  if (role === "provider" && !bottles && !bags && !mixed) {
    errors.plasticTypes = "At least one plastic type quantity is required";
  }

  // Validate field lengths
  if (description.length > 500) {
    errors.description = "Description must be less than 500 characters";
  }
  if (title.length > 50) {
    errors.title = "Title must be less than 50 characters";
  }

  // Return errors if any
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const postAttributes = {
    userID: auth.currentUser?.uid,
    title,
    state,
    city,
    description,
    bottles: Number(bottles),
    bags: Number(bags),
    mixed: Number(mixed),
    createdAt: serverTimestamp(),
    role,
  };

  return sharePost(postAttributes);
}

export default function NewPost() {

  const { t } = useTranslation()

  const errorMessages = useActionData()
  const navigation = useNavigation()

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Only allow up to 3 images
    if (images.length + files.length > 3) {
      setErrors((prev) => ({
        ...prev,
        images: "Maximum 3 images allowed",
      }));
      return;
    }

    // Create preview URLs for the images
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    if (errors.images) {
      setErrors((prev) => ({
        ...prev,
        images: null,
      }));
    }
  };
  const removeImage = (index) => {
    const newImages = [...images];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImages[index].preview);

    newImages.splice(index, 1);
    setImages(newImages);
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  return (
    <div className="new-post-container">
      <div className="form-container">
        <div className="form-header">
          <h1>{t('new_post_title')}</h1>
          <p>{t('new_post_description')}</p>
        </div>

        <Form method="post" replace  encType="multipart/form-data" className="post-form">
          <div className="form-section">
            <h2>{t('new_post_basic_info')}</h2>

            <div className="form-group">
              <div className="floating-input">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder=""
                  className={errorMessages?.title ? "has-error" : ""}
                />
                <label htmlFor="title">{t('new_post_post_title')}</label>
                {errorMessages?.title && <span className="error-message">{errorMessages?.title}</span>}
              </div>
            </div>

            <div className="form-group">
              <div className="floating-input textarea">
                <textarea
                  id="description"
                  name="description"
                  placeholder=""
                  rows="4"
                  className={errorMessages?.description ? "has-error" : ""}
                ></textarea>
                <label htmlFor="description">{t('new_post_post_description')}</label>
                {errorMessages?.description && <span className="error-message">{errorMessages?.description}</span>}
              </div>
              <span className="input-hint">{t('new_post_description_placeholder')}</span>
            </div>
          </div>

          <div className="form-section">
            <h2>{t('new_post_location')}</h2>

            <div className="form-row">
              <div className="form-group half">
                <div className="floating-input select">
                  <select
                    id="state"
                    name="state"
                    value={selectedState}
                    onChange={handleStateChange}
                    className={errorMessages?.state ? "has-error" : ""}
                  >
                    <option value="">{t('new_post_state_placeholder')}</option>
                    {states.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="state">{t('new_post_state')}</label>
                  {errorMessages?.state && <span className="error-message">{errorMessages?.state}</span>}
                </div>
              </div>

              <div className="form-group half">
                <div className="floating-input">
                  <select
                    id="city"
                    name="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    className={errorMessages?.city ? "has-error" : ""}
                  >
                    <option value="">{t('new_post_city_placeholder')}</option>
                    {selectedState &&
                      cities[selectedState].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="city">{t('new_post_city')}</label>
                  {errorMessages?.city && <span className="error-message">{errorMessages?.city}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>{t('new_post_role')}</h2>

            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="provider"
                  name="role"
                  value="provider"
                  checked={selectedRole === "provider"}
                  onChange={handleRoleChange}
                />
                <label htmlFor="provider">{t('new_post_provider')}</label>
              </div>

              <div className="radio-option">
                <input
                  type="radio"
                  id="collector"
                  name="role"
                  value="collector"
                  checked={selectedRole === "collector"}
                  onChange={handleRoleChange}
                />
                <label htmlFor="collector">{t('new_post_collector')}</label>
              </div>
            </div>
            <span className="error-message">{errorMessages?.role}</span>
          </div>

          {selectedRole === "provider" && (
            <>
              <div className="form-section">
                <h2>{t('new_post_details')}</h2>
                <p className="section-description">{t('new_post_details_description')}</p>

                <div className="plastic-types-grid">
                  <div className="plastic-type-card">
                    <div className="plastic-type-icon">
                      <Milk />
                    </div>
                    <h3 className="plastic-type-title">{t('new_post_bottles')}</h3>
                    <p className="plastic-type-description">{t('new_post_bottles_description')}</p>
                    <div className="plastic-type-quantity">
                      <input type="number" name="bottles" min="0" />
                    </div>
                  </div>

                  <div className="plastic-type-card">
                    <div className="plastic-type-icon">
                      <ShoppingBag />
                    </div>
                    <h3 className="plastic-type-title">{t('new_post_bags')}</h3>
                    <p className="plastic-type-description">{t('new_post_bags_description')}</p>
                    <div className="plastic-type-quantity">
                      <input type="number" name="bags" min="0" />
                    </div>
                  </div>

                  <div className="plastic-type-card">
                    <div className="plastic-type-icon">
                      <Recycle />
                    </div>
                    <h3 className="plastic-type-title">{t('new_post_mixed_items')}</h3>
                    <p className="plastic-type-description">{t('new_post_mixed_items_description')}</p>
                    <div className="plastic-type-quantity">
                      <input type="number" name="mixed" min="0" />
                    </div>
                  </div>
                </div>

                {errorMessages?.plasticTypes && (
                  <div className="error-container">
                    <span className="error-message">{errorMessages?.plasticTypes}</span>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h2>{t('new_post_photos')}</h2>
                <p className="section-description">{t('new_post_photos_description')}</p>

                <div className="image-upload-section">
                  <div className="image-upload-container">
                    <input
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="image-upload-input"
                    />
                    <label htmlFor="images" className="image-upload-label">
                      <Camera className="image-upload-icon" />
                      <span>{t('new_post_add_photos')}</span>
                      <span className="image-upload-hint">{t('new_post_max_photos')}</span>
                    </label>
                  </div>

                  {errors.images && <span className="error-message">{errors.images}</span>}

                  <div className="image-preview-container">
                    {images.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.preview || "/placeholder.svg"} alt={`Preview ${index + 1}`} />
                        <button type="button" className="image-remove-btn" onClick={() => removeImage(index)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={navigation.state === "submitting"}>
              {navigation.state === "submitting" ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  {t('new_post_publishing')}
                </>
              ) : (
                <>
                  <Upload size={20} />
                  {t('new_post_publish_post')}
                </>
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
