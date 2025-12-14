// --------------------------------------------------
//  GLOBAL API URL
// --------------------------------------------------
const API = "http://localhost:3000";

// --------------------------------------------------
//  CONTACT FORM
// --------------------------------------------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            first_name: document.getElementById("first_name").value,
            last_name: document.getElementById("last_name").value,
            gender: document.getElementById("gender").value,
            mobile: document.getElementById("mobile").value,
            dob: document.getElementById("dob").value,
            email: document.getElementById("email").value,
            language: document.getElementById("language").value,
            message: document.getElementById("message").value,
        };

        try {
            const res = await fetch(`${API}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.error || "Contact submission failed");
                return;
            }

            const msg = document.getElementById("contactMsg");
            msg.innerText = "Message Sent Successfully 🌸";
            msg.style.color = "#7c5cbf";

            contactForm.reset();

        } catch (err) {
            console.error(err);
        }
    });
}

// --------------------------------------------------
//  CREATE REALISTIC SVG FLOWERS
// --------------------------------------------------
function createSvgFlower(type) {
    const container = document.createElement("div");
    container.className = "flower-container";

    if (type === "Sunflower") {
        container.innerHTML = `
        <svg viewBox="0 0 120 160">
          <rect x="56" y="70" width="8" height="70" rx="4" fill="#3fa34d"/>
          <g transform="translate(60,60)">
            <circle r="38" fill="#ffd34e"/>
            <circle r="30" fill="#ffc53a"/>
          </g>
          <circle cx="60" cy="60" r="22" fill="#5b3a29"/>
        </svg>`;
    } else if (type === "Red Rose") {
        container.innerHTML = `
        <svg viewBox="0 0 120 160">
          <rect x="58" y="80" width="6" height="60" rx="3" fill="#3fa34d"/>
          <ellipse cx="48" cy="100" rx="12" ry="6" fill="#4caf50"/>
          <ellipse cx="72" cy="110" rx="12" ry="6" fill="#4caf50"/>
          <g transform="translate(60,65)">
            <circle r="24" fill="#f0627e"/>
            <circle cx="-8" cy="-4" r="18" fill="#ff8fa3"/>
            <circle cx="9" cy="-3" r="16" fill="#ffb0c2"/>
          </g>
        </svg>`;
    } else if (type === "Lavender") {
        container.innerHTML = `
        <svg viewBox="0 0 120 160">
          <rect x="59" y="70" width="4" height="70" rx="2" fill="#4c9a5a"/>
          <g transform="translate(61,65)">
            <rect x="-10" y="-50" width="20" height="14" rx="7" fill="#e5d3ff"/>
            <rect x="-9" y="-35" width="18" height="14" rx="7" fill="#d0b7ff"/>
            <rect x="-8" y="-20" width="18" height="14" rx="7" fill="#c09bff"/>
            <rect x="-7" y="-5" width="16" height="14" rx="7" fill="#a97eff"/>
          </g>
        </svg>`;
    } else {
        container.innerHTML = `
        <svg viewBox="0 0 120 160">
          <rect x="58" y="80" width="6" height="60" rx="3" fill="#4caf6f"/>
          <g transform="translate(60,60)">
            <circle r="26" fill="#ffe2f0"/>
            <circle cx="-8" cy="-6" r="18" fill="#ffd1f0"/>
            <circle cx="10" cy="-4" r="16" fill="#e3e4ff"/>
            <circle cx="0" cy="10" r="15" fill="#d4ffe4"/>
          </g>
        </svg>`;
    }

    return container;
}

// --------------------------------------------------
//  FLOWER GROWTH (Seed → Sprout → Bloom)
// --------------------------------------------------
function createFlowerIn(gardenEl, type, quantity = 1) {
    if (!gardenEl) return;

    if (type === "Mixed") {
        const types = ["Sunflower", "Red Rose", "Lavender"];
        for (let i = 0; i < quantity; i++) {
            const r = types[Math.floor(Math.random() * types.length)];
            createFlowerIn(gardenEl, r, 1);
        }
        return;
    }

    for (let i = 0; i < quantity; i++) {
        const posX = Math.random() * (gardenEl.clientWidth - 140);
        const groundY = gardenEl.clientHeight - 30;

        const seed = document.createElement("div");
        seed.className = "seed";
        seed.style.left = `${posX + 70}px`;
        seed.style.top = `${groundY}px`;
        gardenEl.appendChild(seed);

        setTimeout(() => {
            seed.remove();

            const sprout = document.createElement("div");
            sprout.className = "sprout";
            sprout.style.left = `${posX + 72}px`;
            sprout.style.top = `${groundY - 70}px`;
            gardenEl.appendChild(sprout);

            setTimeout(() => {
                sprout.remove();
                const flower = createSvgFlower(type);
                flower.style.position = "absolute";
                flower.style.left = `${posX}px`;
                flower.style.top = `${groundY - 160}px`;
                gardenEl.appendChild(flower);
            }, 800);
        }, 600);
    }
}

// --------------------------------------------------
//  PLANT PAGE — SUBMIT FORM
// --------------------------------------------------
const plantForm = document.getElementById("plantForm");
const garden = document.getElementById("garden");

if (plantForm && garden) {
    plantForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            flower_type: document.getElementById("flower_type").value,
            quantity: Number(document.getElementById("quantity").value),
            date: document.getElementById("date").value,
            time_slot: document.getElementById("time_slot").value,
            notes: document.getElementById("notes").value,
            user_id:
                document.getElementById("name").value.trim() +
                "_" +
                document.getElementById("phone").value.trim(),
        };

        // Frontend Validation
        if (data.name.length < 3) {
            alert("Name must be at least 3 characters");
            return;
        }
        if (!/^05\d{8}$/.test(data.phone)) {
            alert("Invalid Saudi phone number");
            return;
        }
        if (data.quantity < 1) {
            alert("Quantity must be at least 1");
            return;
        }

        try {
            const res = await fetch(`${API}/api/reservations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                document.getElementById("plantMsg").innerText = result.error;
                document.getElementById("plantMsg").style.color = "red";
                return;
            }

            document.getElementById("plantMsg").innerText =
                "Your flower has been planted 🌸✨";
            document.getElementById("plantMsg").style.color = "#7b5ca6";

            createFlowerIn(garden, data.flower_type, data.quantity);
            plantForm.reset();

        } catch (err) {
            console.error(err);
        }
    });
}

// --------------------------------------------------
//  MY BOOKINGS — LOGIN + FETCH
// --------------------------------------------------
const lookupBtn = document.getElementById("lookupBtn");
const myGarden = document.getElementById("myGarden");

if (lookupBtn) {
    lookupBtn.addEventListener("click", async () => {
        const name = document.getElementById("loginName").value.trim();
        const phone = document.getElementById("lookupPhone").value.trim();

        if (!name || !phone) {
            alert("Please enter your name and phone number.");
            return;
        }

        const res = await fetch(
            `${API}/my-bookings?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`
        );

        const bookings = await res.json();
        displayBookings(bookings);
        renderMyGarden(bookings);
    });
}

function renderMyGarden(list) {
    if (!myGarden) return;
    myGarden.innerHTML = "";

    list.forEach(b => {
        createFlowerIn(myGarden, b.flower_type, b.quantity);
    });
}

function displayBookings(list) {
    const container = document.getElementById("bookingResults");
    container.innerHTML = "";

    if (!list.length) {
        container.innerHTML = "<p>No bookings found 🌱</p>";
        return;
    }

    list.forEach(b => {
        const card = document.createElement("div");
        card.className = "booking-card";

        card.innerHTML = `
            <h3>${b.flower_type} (${b.quantity})</h3>
            <p><strong>Name:</strong> ${b.name}</p>
            <p><strong>Phone:</strong> ${b.phone}</p>
            <p><strong>Date:</strong> ${b.date}</p>
            <p><strong>Time:</strong> ${b.time_slot}</p>
            <p><strong>Notes:</strong> ${b.notes || ""}</p>
        `;

        container.appendChild(card);
    });
}

// --------------------------------------------------
//  WATER MAGIC
// --------------------------------------------------
const waterBtn = document.getElementById("waterBtn");

if (waterBtn && garden) {
    waterBtn.addEventListener("click", () => {
        for (let i = 0; i < 12; i++) {
            const drop = document.createElement("div");
            drop.className = "water-drop";
            drop.style.left = Math.random() * garden.clientWidth + "px";
            drop.style.animationDuration = 0.8 + Math.random() * 0.5 + "s";
            garden.appendChild(drop);
            setTimeout(() => drop.remove(), 1500);
        }
    });
}

// --------------------------------------------------
//  VIDEO UNMUTE
// --------------------------------------------------
const unmuteBtn = document.getElementById("unmuteBtn");
const heroVideo = document.getElementById("heroVideo");

if (unmuteBtn && heroVideo) {
    unmuteBtn.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;
        unmuteBtn.innerText = heroVideo.muted ? "🔇 Unmute" : "🔊 Mute";
    });
}
