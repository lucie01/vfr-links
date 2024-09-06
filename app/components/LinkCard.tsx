import Image from "next/image";

export default function LinkCard({
    href,
    title,
    image,
}: {
    href: string;
    title: string;
    image?: string;
}) {
    console.log('image', image);
    return (
        <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all bg-gray-100 mb-3 max-w-3xl"
        >
        <div className="flex text-center w-full h-15">
            <div className="flex w-15 h-15">
            {image && (
                <Image
                priority
                className="rounded-full flex"
                alt={title}
                src={image}
                width={60}
                height={60}
                />
            )}
            </div>
            <h2 className="flex justify-center items-center font-semibold w-full text-gray-700 -ml-10">
            {title}
            </h2>
        </div>
        </a>
    );
}