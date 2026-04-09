"use client";

import React, { useState, useEffect } from "react";
import { decrypt } from "@/lib/crypto";

const Page = () => {
    const [result, setResult] = useState<string | null>(null);

    const encrypted = "J+d+Et+tdQMUmzcSzntVCj2YHOUOsBAyZRuePxKA40TPFgAjTEhFK8grihIVglsazP3KYmLLe33ntztQwjtZd+9prKsA8ICJ1lWmnVF8kCZth03JAbwR3eTKD4UENamL8wVuuHWp/pLraWz7NKBrudlwQ0haqL2j7WqEUUnVzCnYT1CSaKGZzjd9veiVKzoSaOuJ9hB0cUBrOAulGf+cLVcRAbh93iEYqE3G14Jruo0y3lTLEUXmSEOMei2B5TOuB0CgonDWCFOiAP5XKNciTOjEszCd0BZSeyi8j418OSn6wVcjQOajlQRKBEpA95q/vylZTexA/hjEX2efehGcjNt+6AI29JLejaNClmZDwpG0c6l2x+vlbvMOSmAzERyxY64a/4WRD9CZP9/OOcZOd3vv2Zanj8Y9MDFPhIm+Zdc8XHI8fEgMkQxu8k0LK2+IgcL//aSN7oh5eMsEsmA="

    useEffect(() => {
        async function doDecrypt() {
            try {
                const decrypted = await decrypt(encrypted);
                setResult(decrypted);
            } catch (err) {
                console.error("Decrypt failed:", err);
            }
        }
        doDecrypt();
    }, []);

    return (
        <div>
            <h1>ถอดรหัส</h1>
            {result ? (
                <pre>{JSON.stringify(JSON.parse(result), null, 2)}</pre>
            ) : (
                <p>กำลังถอดรหัส...</p>
            )}
        </div>
    );
};

export default Page;