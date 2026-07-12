import express from "express";

const router = express.Router();

const openApiSpecification = {
  openapi: "3.0.3",
  info: {
    title: "The Alchemist's Courier API",
    version: "2.0.0",
    description: "Enterprise backend API for The Alchemist's Courier — Victorian Guild Correspondence & Secret Library Platform.",
    contact: {
      name: "Prakhar Rai",
      role: "Producer & Lead Developer",
      email: "prakharrai12@courierguild.org"
    }
  },
  servers: [
    { url: "http://localhost:5000/api", description: "Local Guild Server" }
  ],
  paths: {
    "/auth/login": {
      post: {
        summary: "Authenticate or register Guild Courier",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "elias.vance@courierguild.org" },
                  password: { type: "string", example: "password123" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Successful authentication return token and profile data" },
          401: { description: "Invalid credentials" }
        }
      }
    },
    "/ciphers": {
      get: {
        summary: "Retrieve Occult Vault Ciphers",
        responses: { 200: { description: "Array of secret volumes" } }
      }
    },
    "/ciphers/unlock": {
      post: {
        summary: "Attempt to break the lead seal on a classified cipher volume",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  cipherId: { type: "string", example: "1894-A" },
                  attemptKey: { type: "string", example: "ALCHEMIST" },
                  userId: { type: "string", example: "u_elias" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Decrypted Occult text and Gold reward" },
          401: { description: "Incorrect cipher key" }
        }
      }
    },
    "/config/packages": {
      get: {
        summary: "Get dynamic Sovereign Gold pricing packages and UPI targets",
        responses: {
          200: { description: "Package list starting from 1599 gold limit and 39 INR starter tier" }
        }
      }
    }
  }
};

router.get("/docs/json", (req, res) => {
  res.json(openApiSpecification);
});

router.get("/docs", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>The Alchemist's Courier — API Archives</title>
      <style>
        body { font-family: 'Georgia', serif; background: #1a1614; color: #f4edd4; padding: 2rem; max-width: 900px; margin: auto; }
        h1 { color: #fdad67; border-bottom: 2px solid #8c4f10; padding-bottom: 0.5rem; }
        .endpoint { background: #26201d; border: 1px solid #4a3a30; padding: 1.2rem; margin: 1rem 0; border-radius: 6px; }
        .method { font-weight: bold; padding: 0.2rem 0.6rem; border-radius: 4px; display: inline-block; margin-right: 0.5rem; }
        .post { background: #610000; color: #fff; }
        .get { background: #1e3a8a; color: #fff; }
        code { background: #110e0d; color: #ffbc7a; padding: 0.2rem 0.4rem; border-radius: 3px; font-family: monospace; }
        .footer { margin-top: 3rem; font-size: 0.9rem; color: #a89f91; text-align: center; border-top: 1px solid #362e2a; padding-top: 1rem; }
      </style>
    </head>
    <body>
      <h1>📜 The Alchemist's Courier — Scriptorium API Archives</h1>
      <p>Enterprise API specification v2.0.0 | Producer & Lead Developer: <strong>Prakhar Rai</strong></p>
      <p><a href="/api/docs/json" style="color: #fdad67;">[Download OpenAPI 3.0 JSON Specification]</a></p>
      
      <div class="endpoint">
        <span class="method post">POST</span> <code>/api/auth/login</code>
        <p>Authenticate Guild courier using email and password credentials. Returns access signet token.</p>
      </div>

      <div class="endpoint">
        <span class="method get">GET</span> <code>/api/ciphers</code>
        <p>Retrieve Occult Vault secret volumes, lead seals, and author metadata.</p>
      </div>

      <div class="endpoint">
        <span class="method post">POST</span> <code>/api/ciphers/unlock</code>
        <p>Submit decryption key attempt. Breaks lead seal on match and credits Sovereign Gold to member exchequer.</p>
      </div>

      <div class="endpoint">
        <span class="method get">GET</span> <code>/api/config/packages</code>
        <p>Retrieve dynamic Gold packages starting at ₹39 (12 Gold) up to ₹1499 (1000 Gold + 200 Bonus) and UPI target information.</p>
      </div>

      <div class="footer">
        © 1894–2026 The Alchemist's Courier Guild. All Rights Reserved. Contact: prakharrai12@courierguild.org
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

export default router;
