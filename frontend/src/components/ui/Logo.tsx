import Link from "next/link";
import Image from "next/image";

type Props = {
  size: number;
};
const Logo = ({ size }: Props) => {
  return (
    <Link href="/">
      <Image
        src={"/logo.png"}
        alt="Z"
        width={size}
        height={size}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
