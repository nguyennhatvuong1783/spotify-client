import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
                port: "",
                pathname: "/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "www.shyamh.com",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
};

export default nextConfig;
