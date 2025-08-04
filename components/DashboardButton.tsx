import { Button } from "./ui/Button";
import Link from "next/link";

const DashboardButton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/signin">
        <Button variant="dark">Sign in</Button>
      </Link>
      <Link href="/signup">
        <Button>Sign up</Button>
      </Link>
    </div>
  );
};

export default DashboardButton;
