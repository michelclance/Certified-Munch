import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import Link from "next/link";

const FeedbackForm = () => {
  return (
    <div>
              <Link href="/">
          <HomeIcon className="h-8 w-8 mr-1 flex items-center text-gray-800" />
        </Link>
      <iframe
        src="https://docs.google.com/forms/d/1WwYnMJUImvPfT8jCefiGW-Mi2B6_oZM-4G07ILR81HY/viewform?embedded=true"
        width="640"
        height="800"
      >
        Loading…
      </iframe>
    </div>
  );
};

export default FeedbackForm;