export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="ml-2 flex items-center gap-2">
      {/* TEMPLATE: Replace /logo.svg with your brand logo */}
      <img 
        src="/logo.svg" 
        alt="3dmin Logo"
        className="h-10 w-auto object-contain transition-transform hover:scale-105" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">3dmin</span>';
        }}
      />
    </a>
  )
}