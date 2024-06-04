export default function Footer() {
  return (
    <footer className=" px-8 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <p color="blue-gray" className="font-normal">
        &copy; {new Date().getFullYear()} Simply Sensible
      </p>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <p
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:cursor-pointer hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </p>
        </li>
        <li>
          <a
            href="mailto:shivbhadaniya56@gmail.com"
            color="blue-gray"
            className="font-normal transition-colors hover:cursor-pointer hover:text-blue-500 focus:text-blue-500"
          >
            <p>Contact Us</p>
          </a>
        </li>
      </ul>
    </footer>
  );
}
