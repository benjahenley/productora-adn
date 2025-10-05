import { useParams, Navigate } from "react-router-dom";
import { servicesContent } from "../data/servicesContent";

const ServiceDetail = () => {
  const { slug } = useParams();

  // Find the service by slug
  const service = servicesContent.find((s) => s.slug === slug);

  // If service not found, redirect to services page
  if (!service) {
    return <Navigate to="/servicios" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:max-h-screen overflow-clip">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center py-16 lg:h-[80vh]">
            <div className="mb-6">
              <span className="inline-block bg-primary-600 text-base font-semibold tracking-wider px-4 py-1 uppercase">
                Servicios
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6 uppercase">
              {service.title}
            </h3>

            <div className="leading-relaxed text-base opacity-60 font-roboto">
              <p>{service.content}</p>
            </div>
          </div>

          {/* Right Column - Video */}
          {service.video && (
            <div className="flex items-center lg:min-h-screen">
              <div className="w-full overflow-hidden shadow-2xl">
                <video
                  className="w-full h-full object-fill"
                  autoPlay
                  muted
                  loop
                  playsInline>
                  <source src={service.video} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
