export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 flex flex-row">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-center">
          © {new Date().getFullYear()} SafeDoc. All Rights Reserved.
        </p>
      </div>
      <a className="w-24" href="https://github.com/YashDxr/safe-doc">Contact us</a>
    </footer>
  );
}
