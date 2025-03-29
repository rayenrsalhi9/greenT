/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react"
import { redirect, Form, useActionData, useNavigation } from "react-router-dom"
import { auth } from "../../config/firebase"
import { states, cities } from "../../utils/locations"
import { Upload, Camera, Trash2, Milk, ShoppingBag, Recycle, Loader2 } from "lucide-react"
import { serverTimestamp } from "firebase/firestore"
import { sharePost } from '../../firebase/sharePost'
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
          <h1>Create New Plastic Recycling Post</h1>
          <p>Share details about the plastic items you have collected.</p>
        </div>

        <Form method="post" replace  encType="multipart/form-data" className="post-form">
          <div className="form-section">
            <h2>Basic Informations</h2>

            <div className="form-group">
              <div className="floating-input">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder=" "
                  className={errorMessages?.title ? "has-error" : ""}
                />
                <label htmlFor="title">Post Title</label>
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
                <label htmlFor="description">Description</label>
                {errorMessages?.description && <span className="error-message">{errorMessages?.description}</span>}
              </div>
              <span className="input-hint">Describe the plastic items you're offering or looking for</span>
            </div>
          </div>

          <div className="form-section">
            <h2>Location</h2>

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
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="state">State</label>
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
                    <option value="">Select City</option>
                    {selectedState &&
                      cities[selectedState].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                  <label htmlFor="city">City</label>
                  {errorMessages?.city && <span className="error-message">{errorMessages?.city}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Role</h2>

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
                <label htmlFor="provider">I am offering plastic</label>
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
                <label htmlFor="collector">I am looking for plastic</label>
              </div>
            </div>
            <span className="error-message">{errorMessages?.role}</span>
          </div>

          {selectedRole === "provider" && (
            <>
              <div className="form-section">
                <h2>Plastic Details</h2>
                <p className="section-description">Specify the types and quantities of plastic items</p>

                <div className="plastic-types-grid">
                  <div className="plastic-type-card">
                    <div className="plastic-type-icon">
                      <Milk />
                    </div>
                    <h3 className="plastic-type-title">Bottles</h3>
                    <p className="plastic-type-description">PET, HDPE bottles, containers</p>
                    <div className="plastic-type-quantity">
                      <input type="number" name="bottles" min="0" />
                    </div>
                  </div>

                  <div className="plastic-type-card">
                    <div className="plastic-type-icon">
                      <ShoppingBag />
                    </div>
                    <h3 className="plastic-type-title">Bags</h3>
                    <p className="plastic-type-description">Plastic bags, films, wrappers</p>
                    <div className="plastic-type-quantity">
                      <input type="number" name="bags" min="0" />
                    </div>
                  </div>

                  <div className="plastic-type-card">
                    <div className="plastic-type-icon">
                      <Recycle />
                    </div>
                    <h3 className="plastic-type-title">Mixed Items</h3>
                    <p className="plastic-type-description">Other plastic items, mixed materials</p>
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
                <h2>Photos</h2>
                <p className="section-description">Add up to 3 photos of your plastic items (optional)</p>

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
                      <span>Add Photos</span>
                      <span className="image-upload-hint">(Max 3 images)</span>
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
                  Submitting...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
