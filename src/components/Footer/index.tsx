const FOOTER_IMAGE =
  "https://utfs.io/f/9076bf45-4d29-49ab-9835-4c863f3c63fa-1zbfv.png";

function Footer() {
  return (
    <>
      <div className="sm:max-h-[20%] p-5 sm:mb-0 mb-16  flex sm:justify-start justify-center items-center w-full z-30">
        <img src={FOOTER_IMAGE} className="h-full max-h-[100px]" />
      </div>
      <div className="w-full text-center text-xs text-gray-600 flex flex-col sm:py-3 py-10 fixed bottom-0">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          <a
            className="text-gray-800 hover:underline cursor-pointer"
            href="https://www.instagram.com/bouklao"
            target="_blank"
            rel="noreferrer"
          >
            bouklao
          </a>
          {". All rights reserved. Built by "}
          <a
            className="text-gray-800 hover:underline cursor-pointer"
            href="mailto:seifmegahed@me.com"
            target="_blank"
            rel="noreferrer"
          >
            seifmegahed
          </a>
          {"."}
        </span>
      </div>
    </>
  );
}
export default Footer;
