import { companyData } from "../data/company";
import { formatWhatsAppLink } from "../utils/format";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase">
              {companyData.name}
            </h3>
            <p className="text-gray-300 leading-relaxed font-roboto">
              {companyData.tagline}
            </p>
            <p className="text-accent-500 font-normal text-sm font-roboto">
              {companyData.yearsExperience}+ años creando experiencias únicas
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold uppercase">Contacto</h4>
            <div className="space-y-3">
              <div>
                <strong className="text-white/80 font-semibold font-roboto uppercase text-sm">
                  Dirección:
                </strong>
                <br />
                <a
                  href={companyData.address}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-500 hover:text-white transition-colors">
                  {companyData.address}
                </a>
              </div>
              <div>
                <strong className="text-white/80 font-semibold font-roboto uppercase text-sm">
                  Teléfono:
                </strong>
                <br />
                <a
                  href={`tel:${companyData.phone}`}
                  className="text-accent-500 hover:text-white transition-colors">
                  {companyData.phone}
                </a>
              </div>
              <div>
                <strong className="text-white/80 font-semibold font-roboto uppercase text-sm">
                  Email:
                </strong>
                <br />
                <a
                  href={`mailto:${companyData.email}`}
                  className="text-accent-500 hover:text-white transition-colors">
                  {companyData.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm font-roboto">
            © {currentYear} {companyData.name} S.A.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
