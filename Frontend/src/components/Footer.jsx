export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 py-6 text-center text-sm text-gray-600">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-semibold text-purple-700">ThinkBox</span>. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a
            href="#"
            className="hover:underline hover:text-purple-600 transition"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:underline hover:text-purple-600 transition"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:underline hover:text-purple-600 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
