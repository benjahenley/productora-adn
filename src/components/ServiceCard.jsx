const ServiceCard = ({ service }) => {
  return (
    <div className="card h-full flex flex-col group">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={service.img}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed flex-1">{service.desc}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
