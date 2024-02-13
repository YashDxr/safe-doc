export default function Footer() {
  return (
    <footer className="fixed bottom-0 bg-gray-800 text-white py-4 w-full">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-center">
          © {new Date().getFullYear()} SafeDoc. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
