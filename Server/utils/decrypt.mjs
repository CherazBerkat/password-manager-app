import crypto from "crypto";

const secret = "pppppppppppppppppppppppppppppppp"; // 32-byte key for AES-256

const decrypt = (encryption) => {
  try {
    const iv = Buffer.from(encryption.iv, "hex"); // Convert IV from hex to Buffer
    const decipher = crypto.createDecipheriv(
      "aes-256-ctr",
      Buffer.from(secret),
      iv
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryption.password, "hex")),
      decipher.final(),
    ]);
    return decrypted.toString("utf-8");
  } catch (error) {
    console.error("Error decrypting password:", error);
    throw error; // Rethrow error to handle it in the route handler
  }
};

export default decrypt;
