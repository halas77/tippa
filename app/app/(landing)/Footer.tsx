const Footer = () => {
  return (
    <footer className="border-t border-gray-800 w-full px-28">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} tippa. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
