import crypto from "crypto";

const secret = "pppppppppppppppppppppppppppppppp"; // 32-byte key for AES-256

const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // Generate a random IV
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return {
    iv: iv.toString("hex"),
    password: encrypted.toString("hex"),
  };
};

export default encrypt;
