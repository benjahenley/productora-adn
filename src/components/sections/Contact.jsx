import { useState } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { companyData } from "../../data/company";
import emailjs from "@emailjs/browser";
import { MapPin, Phone, Mail, MessageCircle, Check } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const [titleRef, isTitleVisible] = useIntersectionObserver();
  const [infoRef, isInfoVisible] = useIntersectionObserver();
  const [formRef, isFormVisible] = useIntersectionObserver();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Prepare template parameters
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        phone: formData.telefono,
        message: formData.mensaje,
        to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Success - extract name and show success message
      setUserName(formData.nombre);
      setIsSuccess(true);

      // Reset form
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert(
        "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    setUserName("");
  };

  return (
    <section id="contacto" className=" bg-primary-600">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">
          {/* Map Section - Left Side */}
          <div className="w-full h-[500px] lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168881864147!2d-58.3816!3d-34.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3353343373c21%3A0x4d5d8d8d8d8d8d8d!2sAv.%20de%20Mayo%201353%2C%20CABA!5e0!3m2!1ses!2sar!4v1234567890123!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=""
              title="Ubicación Productora ADN"
            />
          </div>

          {/* Contact Form - Right Side */}
          <div className="space-y-8 p-8 lg:p-12 pt-16">
            {!isSuccess ? (
              <>
                {/* Contact Title */}
                <div
                  ref={titleRef}
                  className={`mb-8 transition-all duration-700 ${
                    isTitleVisible
                      ? "animate-fall-in"
                      : "opacity-0 translate-y-8"
                  }`}>
                  <h2 className="text-4xl md:text-5xl font-normal text-white mb-4 uppercase">
                    Contacto
                  </h2>
                </div>

                {/* Contact Info */}
                <div
                  ref={infoRef}
                  className={`space-y-4 transition-all duration-700 ${
                    isInfoVisible
                      ? "animate-fall-in"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ "--animation-delay": "0.3s" }}>
                  <h3 className="text-2xl uppercase font-normal font-roboto text-white mb-6">
                    Información de Contacto
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold font-roboto">
                          Dirección
                        </p>
                        <p className="text-white/80 font-sourcecode truncate">
                          {companyData.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold font-roboto">
                          Teléfonos
                        </p>
                        <p className="text-white/80 font-sourcecode truncate">
                          {companyData.phone}
                        </p>
                        <p className="text-white/80 font-sourcecode truncate">
                          4720 4723
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold font-roboto">
                          Email
                        </p>
                        <p className="text-white/80 font-sourcecode truncate">
                          {companyData.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div
                  ref={formRef}
                  className={`transition-all duration-700 ${
                    isFormVisible
                      ? "animate-fall-in"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ "--animation-delay": "0.6s" }}>
                  <h3 className="text-2xl uppercase font-normal font-roboto text-white mb-6">
                    Envíanos un Mensaje
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm font-sourcecode"
                          placeholder="Nombre"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm font-sourcecode text-overflow-ellipsis"
                          placeholder="E-mail"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300  backdrop-blur-sm"
                        placeholder="Teléfono"
                      />
                    </div>

                    <div>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm resize-none font-sourcecode"
                        placeholder="Tu mensaje (opcional)"></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-8 font-bold transition-all duration-300 uppercase tracking-wide shadow-lg font-roboto ${
                        isSubmitting
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-white text-primary-600 hover:bg-white/90 hover:shadow-xl transform cursor-pointer"
                      }`}>
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        "Enviar Mensaje"
                      )}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* Success Message Component */
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
                {/* Checkmark Icon */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <Check
                    className="w-12 h-12 text-primary-600"
                    strokeWidth={3}
                  />
                </div>

                {/* Success Message */}
                <div className="space-y-4">
                  <h3 className="text-3xl font-normal text-white uppercase">
                    Mensaje Enviado
                  </h3>
                  <p className="text-white/80 text-lg font-roboto text-balance">
                    Gracias {userName}, hemos recibido tu mensaje y nos
                    pondremos en contacto contigo pronto.
                  </p>
                </div>

                {/* Send Another Button */}
                <button
                  onClick={handleSendAnother}
                  className="bg-white text-primary-600 font-bold py-3 px-8 hover:bg-white/90 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl transform font-roboto cursor-pointer">
                  Enviar Otro Mensaje
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/54${companyData.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse"
        aria-label="Contactar por WhatsApp">
        <MessageCircle className="w-6 h-6" fill="currentColor" />
      </a>
    </section>
  );
};

export default Contact;
