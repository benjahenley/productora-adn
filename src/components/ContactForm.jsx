import { useState } from "react";
import { companyData } from "../data/company";
import { FORMS_CONFIG, FORM_FIELDS } from "../constants/forms";
import { formatWhatsAppLink } from "../utils/format";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (FORMS_CONFIG.formspree.enabled) {
        const response = await fetch(FORMS_CONFIG.formspree.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitStatus("success");
          setFormData({
            name: "",
            email: "",
            phone: "",
            eventType: "",
            message: "",
          });
        } else {
          throw new Error("Error en el envío");
        }
      } else {
        // Simulación para desarrollo
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          message: "",
        });
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactForm}>
      <div className="container">
        <div className={styles.contactContainer}>
          {/* Form */}
          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Contactanos</h2>
            <p className={styles.formDescription}>
              Cuéntanos sobre tu evento y te ayudaremos a hacerlo realidad
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="11 5841 0452"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="eventType" className={styles.formLabel}>
                    Tipo de Evento
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={styles.formSelect}>
                    <option value="">Seleccionar tipo</option>
                    {FORM_FIELDS.eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={styles.formTextarea}
                  placeholder="Cuéntanos sobre tu evento, fecha, ubicación y cualquier detalle importante..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary ${styles.submitButton}`}>
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>

              {submitStatus === "success" && (
                <div className={styles.successMessage}>
                  ¡Mensaje enviado correctamente! Te contactaremos pronto.
                </div>
              )}

              {submitStatus === "error" && (
                <div className={styles.errorMessage}>
                  Hubo un error al enviar el mensaje. Por favor, intenta
                  nuevamente.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <h3 className={styles.contactInfoTitle}>Información de Contacto</h3>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <strong>Dirección</strong>
                  <p>{companyData.address}</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <strong>Teléfono</strong>
                  <p>
                    <a
                      href={`tel:${companyData.phone}`}
                      className={styles.contactLink}>
                      {companyData.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <p>
                    <a
                      href={`mailto:${companyData.email}`}
                      className={styles.contactLink}>
                      {companyData.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.whatsappSection}>
              <a
                href={formatWhatsAppLink(companyData.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
