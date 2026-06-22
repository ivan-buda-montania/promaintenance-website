import logoUrl from "../assets/Pro_Maintenance_New_Logo-removebg.png";

export default function Logo({
  className = "h-10 w-auto",
  alt = "Pro Maintenance Corp.",
  wrapperClassName = "",
}) {
  if (wrapperClassName) {
    return (
      <span className={wrapperClassName}>
        <img src={logoUrl} alt={alt} className={`${className} opacity-75`} loading="eager" />
      </span>
    );
  }
  return <img src={logoUrl} alt={alt} className={`${className} opacity-75`} loading="eager" />;
}
