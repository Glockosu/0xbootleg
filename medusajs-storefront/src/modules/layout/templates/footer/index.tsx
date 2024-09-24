"use client";
// footer.tsx
import Image from 'next/image'; // Import Next.js Image component
import { Text, clx } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";
import { getCategoriesList, getCollectionsList } from "@lib/data";

// Footer component now accepts collections and categories as props
export default function Footer({}) {
  return (
    <footer className="border-t border-ui-border-base w-full">
      <div className="content-container flex flex-col w-full">
        {/* Bottom part of the footer */}
        <div className="flex justify-between items-center w-full mt-12 py-4">
          {/* Copyright */}
          <div className="text-ui-fg-subtle text-sm">
            &copy; {new Date().getFullYear()} 0xbootleg
          </div>

          {/* X.com and Blog Links */}
          <div className="flex items-center gap-8">
            {/* X.com Link with hover effect */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Image
                src="https://res.cloudinary.com/dfpuqqyjm/image/upload/v1727208550/icons8-twitterx-50_1_y6o5d5.png"
                alt="X logo"
                width={24}  // Set the width and height manually for optimization
                height={24}
                className="hover-effect"
              />
            </a>

            {/* Blog Link with hover effect */}
            <a
              href="https://blog.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Image
                src="https://res.cloudinary.com/dfpuqqyjm/image/upload/v1727208549/icons8-google-blog-search-50_qtb4hx.png"
                alt="Blog"
                width={24}  // Set the width and height manually for optimization
                height={24}
                className="hover-effect"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Style for the hover effect */}
      <style jsx>{`
        .hover-effect {
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .hover-effect:hover {
          transform: scale(1.1); /* Slightly increase size */
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)); /* Add glowing effect */
        }
      `}</style>
    </footer>
  );
}

// Fetching collections and categories in getStaticProps
export async function getStaticProps() {
  const { collections } = await getCollectionsList(0, 6);
  const { product_categories } = await getCategoriesList(0, 6);

  return {
    props: {
      collections,
      product_categories,
    },
  };
}





