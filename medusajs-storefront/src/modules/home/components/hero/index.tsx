"use client";
import Image from 'next/image'; // Import Next.js Image component
import { Heading } from "@medusajs/ui";

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <Heading
          level="h1"
          className="text-4xl leading-10 text-ui-fg-base font-normal"
        >
          WELCOME! :D
        </Heading>
        <Heading
          level="h2"
          className="text-xl leading-8 text-ui-fg-subtle font-normal"
        >
          Im glad you made it.
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Men's Collection */}
          <a href="/collections/men" className="text-ui-fg-base hover:underline">
            <div className="p-6 bg-ui-bg-subtle border border-ui-border-base rounded-lg hover-effect">
              <h3 className="text-2xl font-semibold">Collections</h3>
              <p></p>
              <div className="mt-4">
                <Image
                  src="https://res.cloudinary.com/dfpuqqyjm/image/upload/v1726887564/collectionsgif_bct6b9.gif"
                  alt="Collections gif"
                  width={160}  // Set appropriate width and height
                  height={100}
                  className="mx-auto"
                />
              </div>
            </div>
          </a>

          {/* Women's Collection */}
          <a href="/collections/women" className="text-ui-fg-base hover:underline">
            <div className="p-6 bg-ui-bg-subtle border border-ui-border-base rounded-lg hover-effect">
              <h3 className="text-2xl font-semibold">1/1 Sproto Prints</h3>
              <p></p>
              <div className="mt-4">
                <Image
                  src="https://res.cloudinary.com/dfpuqqyjm/image/upload/v1726887555/sprotogif_oaiulv.gif"
                  alt="Sproto gif"
                  width={160}  // Set appropriate width and height
                  height={100}
                  className="mx-auto"
                />
              </div>
            </div>
          </a>

          {/* Accessories Collection */}
          <a
            href="/collections/accessories"
            className="text-ui-fg-base hover:underline"
          >
            <div className="p-6 bg-ui-bg-subtle border border-ui-border-base rounded-lg hover-effect">
              <h3 className="text-2xl font-semibold">Custom Remilia Smiley</h3>
              <p></p>
              <div className="mt-4">
                <Image
                  src="https://res.cloudinary.com/dfpuqqyjm/image/upload/v1726887882/remiliasmileygif-ezgif.com-crop_jvbpf4.gif"
                  alt="Remilia gif"
                  width={160}  // Set appropriate width and height
                  height={100}
                  className="mx-auto"
                />
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Hover Effect Styling */}
      <style jsx>{`
        .hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-effect:hover {
          transform: scale(1.05); /* Slightly increase the size */
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* Add a soft shadow for the glow effect */
        }
      `}</style>
    </div>
  );
};

export default Hero;


