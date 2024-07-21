const FOOTER_IMAGE =
  "https://utfs.io/f/9076bf45-4d29-49ab-9835-4c863f3c63fa-1zbfv.png";

function Footer() {
  return (
    <div className="sm:max-h-[20%] p-5 sm:mb-0 mb-16  flex sm:justify-start justify-center items-center w-full">
      <img src={FOOTER_IMAGE} className="h-full max-h-[100px]" />
    </div>
  );
}
export default Footer;