/**
 * Vietnamese Food Catalog - scripts.js
 * SEA Stage 2 - Dat Tang
 *
 * DATA STRUCTURE:
 *   dishes -> array of objects
 *   Each dish object has:
 *     id, name, englishName, region, type,
 *     spiceLevel (1–5), description,
 *     ingredients (array of strings),
 *     funFact,
 *     imageURL
 *
 * FEATURES:
 *   1. Search: matches name, English name, or description
 *   2. Filter: by region (North, Central, South)
 *   3. Filter: by type (Soup, Noodles, Rice, etc)
 *   4. Sort: by spice level (1-5) or name A–Z
 *   5. Favorites: heart a dish to save it to a favorites list
 *   6. User ratings: click stars to rate any dish (1–5)
 *   7. Stats bar: live count of dishes, avg spice, favorite count
 *   8. Add a dish: submit a form to push a new object into the array
 *   9. Remove dish: remove the item based on the name
 */

/**
 * HARDCODED DATA — Array of Objects
 */

const dishes = [
  {
    id: 1,
    name: "Pho Bo",
    englishName: "Beef Noodle Soup",
    region: "North",
    type: "Soup",
    spiceLevel: 1,
    description:
      "Vietnam's most iconic dish. A fragrant broth simmered for hours with star anise, cinnamon, and charred ginger, served with rice noodles and thinly sliced beef.",
    ingredients: ["Rice noodles", "Beef brisket", "Star anise", "Cinnamon", "Ginger", "Bean sprouts"],
    funFact: "Pho originated in Nam Dinh province in the early 20th century and became a Hanoi staple before spreading worldwide.",
    imageURL: "https://www.manilaspoon.com/wp-content/uploads/2025/03/Beefpho-12-500x500.jpg",
  },
  {
    id: 2,
    name: "Bun Bo Hue",
    englishName: "Hue Spicy Beef Noodle Soup",
    region: "Central",
    type: "Soup",
    spiceLevel: 4,
    description:
      "A bold, lemongrass-infused broth from the ancient city of Hue. Packed with thick round noodles, beef shank, and pork — much spicier than phở.",
    ingredients: ["Round rice noodles", "Beef shank", "Pork hock", "Lemongrass", "Shrimp paste", "Chili oil"],
    funFact: "Bun Bo Hue was once served exclusively in the royal court of the Nguyen dynasty.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7u5KRYaeEmnrSFn1bZmXO9MSK5zgHhj9_BA&s",
  },
  {
    id: 3,
    name: "Banh Mi",
    englishName: "Vietnamese Sandwich",
    region: "South",
    type: "Sandwich",
    spiceLevel: 2,
    description:
      "A French-Vietnamese fusion baguette stuffed with pâté, cold cuts, pickled daikon, cucumber, cilantro, and jalapeños. One of the world's great street foods.",
    ingredients: ["Baguette", "Pork pate", "Cold cuts", "Pickled daikon", "Cilantro", "Jalapeno"],
    funFact: "The banh mi baguette uses rice flour mixed with wheat, making it lighter and crispier than a French baguette.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN9owHDXw_t1u6NfAFlBT_nN0FPyPd06KJyN9uCJEFqki4Ua1frCsBtPlvhq2EeTlGz34jLW_maa2xPDwXnPpya0ciZDOU0c_sJK2Fbw0&s=10",
  },
  {
    id: 4,
    name: "Goi Cuon",
    englishName: "Fresh Spring Rolls",
    region: "South",
    type: "Roll",
    spiceLevel: 1,
    description:
      "Delicate rice paper rolls filled with shrimp, pork, rice vermicelli, fresh herbs, and lettuce. Served cold with a rich hoisin-peanut dipping sauce.",
    ingredients: ["Rice paper", "Shrimp", "Pork belly", "Rice vermicelli", "Mint", "Lettuce"],
    funFact: "Unlike fried spring rolls, gỏi cuốn are never cooked after rolling — everything inside is already prepared.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRDH6DYkpBNbOKrEPqRzGPgo9cOxZly4Clx83H08GRz626QuQ6QXpa7w15np68_F6JylFger9Tni3XvaZZ3CWLQjfQtOlG5jR7ssBVWx4&s=10",
  },
  {
    id: 5,
    name: "Com Tam",
    englishName: "Broken Rice with Grilled Pork",
    region: "South",
    type: "Rice",
    spiceLevel: 1,
    description:
      "A beloved Saigon staple made from broken rice grains topped with chargrilled pork chop, shredded pork skin, steamed egg cake, and savory fish sauce.",
    ingredients: ["Broken rice", "Grilled pork chop", "Shredded pork skin", "Steamed egg", "Cucumber", "Fish sauce"],
    funFact: "Com Tam was originally a poor man's dish — broken grains were cheaper leftovers that rice mills threw away.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA9TUmc3fVdfq5xMtNtliDKmI17AYrtedjxrJdMgWONbf7kOLOK2n6ZDfYukcF6CvQS4cgJNrJL9-3Ud5ijXztnwc-qp3CEhEG2_TWA&s=10",
  },
  {
    id: 6,
    name: "Banh Xeo",
    englishName: "Sizzling Crepe",
    region: "Central",
    type: "Street Food",
    spiceLevel: 2,
    description:
      "A crispy, turmeric-yellow rice flour crepe stuffed with shrimp, pork, bean sprouts, and green onions. Named for the sizzling sound when batter hits the pan.",
    ingredients: ["Rice flour", "Turmeric", "Shrimp", "Pork belly", "Bean sprouts", "Coconut milk"],
    funFact: "The name 'xeo' is onomatopoeia — it literally sounds like the sizzle of batter hitting a hot pan.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSDXJJKYdPsJ2befpG90eBCvcthJsFFNOKu6WsJhQfZLxBa_aeAG2TOPH1_W_YQPuEjN6jKG3bSAez9DuOMqh4DoKMqOxc7bEwQMrXGsfFw&s=10",
  },
  {
    id: 7,
    name: "Bun Cha",
    englishName: "Grilled Pork with Vermicelli",
    region: "North",
    type: "Noodles",
    spiceLevel: 1,
    description:
      "Hanoi's favorite lunch — smoky grilled pork patties served in a sweet-savory dipping broth alongside cold vermicelli noodles and fresh herbs.",
    ingredients: ["Rice vermicelli", "Pork patties", "Pork belly", "Fish sauce", "Garlic", "Fresh herbs"],
    funFact: "Bun Cha became internationally famous when Barack Obama and Anthony Bourdain ate it together at a Hanoi restaurant in 2016.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzq4lsAolPP5Os3eSpdM6MS_CepLNGLNKwdgv0gpukonzloaoMRtKeDG3LJ7rMNqRCvrMk1iyZmXN840wkNXm1SGeu-Uy2atb0_nidTQ&s=10"
  },
  {
    id: 8,
    name: "Cao Lau",
    englishName: "Hoi An Noodles",
    region: "Central",
    type: "Noodles",
    spiceLevel: 1,
    description:
      "A mysterious noodle dish unique to Hoi An — thick chewy noodles traditionally made with water from one specific ancient well, topped with char siu pork.",
    ingredients: ["Thick rice noodles", "Char siu pork", "Bean sprouts", "Crispy croutons", "Mint", "Star anise"],
    funFact: "Locals claim authentic Cao Lau can only be made with water from the ancient Ba Le well in Hoi An's old town.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2iyzpp_B89oumtSd_m9ELG93rycPdEO-oChthS8GL-aOPI5al4tjAjmfozOyTVstu9BZ0VLKgGphKDUutZlRD7Vsb8uzBEyOrHJc2wA&s=10"
  },
  {
    id: 9,
    name: "Cha Gio",
    englishName: "Fried Spring Rolls",
    region: "South",
    type: "Street Food",
    spiceLevel: 1,
    description:
      "Golden, crunchy fried rolls filled with seasoned pork, wood ear mushroom, glass noodles, and vegetables. Served with lettuce wraps and fish dipping sauce.",
    ingredients: ["Rice paper", "Ground pork", "Glass noodles", "Wood ear mushroom", "Carrot", "Shallots"],
    funFact: "In southern Vietnam these are called Cha Gio, but in the north the exact same dish is called Nem Ran.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl8URlaJDpjowW_A_ioXXiskHRSFyBvPJEmGK67fy5WF2PHg_f7m4q2I44BRphhCH72G-qYgvJe8dEv8JXYJ7s925uPvbA7P_4BXTJYK0i&s=10",
  },
  {
    id: 10,
    name: "Hu Tieu",
    englishName: "Southern Pork Noodle Soup",
    region: "South",
    type: "Soup",
    spiceLevel: 1,
    description:
      "A southern staple with a clear, sweet pork-and-dried-shrimp broth over chewy tapioca noodles, topped with sliced pork, shrimp, and quail eggs.",
    ingredients: ["Tapioca noodles", "Pork bones", "Dried shrimp", "Quail eggs", "Bean sprouts", "Green onion"],
    funFact: "Hu Tieu was brought to southern Vietnam by Teochew Chinese immigrants and fully adapted into a uniquely Vietnamese dish.",
    imageURL: "https://runawayrice.com/wp-content/uploads/2017/03/a-Hearty-Pork-Shrimp-Clear-Noodle-Soup.jpg",
  },
  {
    id: 11,
    name: "Bo Kho",
    englishName: "Vietnamese Beef Stew",
    region: "South",
    type: "Soup",
    spiceLevel: 3,
    description:
      "A rich, aromatic beef stew slow-cooked with lemongrass, star anise, and annatto oil until fall-apart tender. Best eaten with a crusty baguette.",
    ingredients: ["Beef shank", "Lemongrass", "Star anise", "Annatto oil", "Carrot", "Baguette"],
    funFact: "Bo Kho is one of the few Vietnamese dishes commonly eaten for breakfast — especially with a crispy baguette dipped in the broth.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTll5k_xGAL5Q33Nv0odzd3jyKoWUwQzPKw_5f1-DsUZvvjf_06UoZyNLTNDYxg1FzJd_dsYevkiRwqcCzh5DP9AuhYSssz7Go-blqVNg&s=10",
  },
  {
    id: 12,
    name: "Bun Rieu",
    englishName: "Crab Tomato Noodle Soup",
    region: "North",
    type: "Soup",
    spiceLevel: 2,
    description:
      "A tangy, tomato-red broth with crab paste dumplings, tofu, and pork. Topped with shrimp paste and fresh herbs — a beloved northern street food.",
    ingredients: ["Rice vermicelli", "Crab paste", "Tomatoes", "Tofu", "Pork", "Shrimp paste"],
    funFact: "The crab dumplings in Bun Rieu are made by mixing ground freshwater crab with egg — they solidify the moment they hit the hot broth.",
    imageURL: "https://i0.wp.com/vickypham.com/wp-content/uploads/2024/08/33fdc-2024_08_22eosm500835.jpg?fit=2500%2C2500&ssl=1",
  },
  {
    id: 13,
    name: "Pho Ga",
    englishName: "Chicken Noodle Soup",
    region: "North",
    type: "Soup",
    spiceLevel: 1,
    description:
      "A lighter, golden-hued cousin of beef pho. The broth is crystal clear and delicate, made by simmering a whole chicken with ginger and onion.",
    ingredients: ["Rice noodles", "Whole chicken", "Ginger", "Onion", "Star anise", "Cilantro"],
    funFact: "Pho Ga became popular in Hanoi in the 1930s on Fridays, when the French colonial government banned beef slaughter one day a week.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn0yV80lJwX91O4z3keYVf2tox0Ttou-s_UmqBn8ABaDq7qzK-JZAbq-fFDGjRrfgvoedWDg0NWn89AIJ5Uc3bD2UWdDdKdSDr8zM1vQ&s=10",
  },
  {
    id: 14,
    name: "Mi Quang",
    englishName: "Quang-Style Noodles",
    region: "Central",
    type: "Noodles",
    spiceLevel: 2,
    description:
      "Wide turmeric-yellow noodles from Quang Nam province served with minimal broth, shrimp, pork, roasted peanuts, and sesame rice crackers.",
    ingredients: ["Wide rice noodles", "Shrimp", "Pork", "Turmeric", "Roasted peanuts", "Rice crackers"],
    funFact: "Mi Quang uses so little broth it is sometimes called a dry noodle dish — the broth is more of a sauce than a soup.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIG1OXUqy1eKxKXpu7mdz1WayT7-4J16dVyAQE_-jQ8CnFR2BLeU1yofnDo1O11mnwLebgY_d9uMO9yWG-HMypSVryZfrvEcc3G6nm8w&s=10",
  },
  {
    id: 15,
    name: "Chao Ga",
    englishName: "Chicken Rice Porridge",
    region: "North",
    type: "Rice",
    spiceLevel: 1,
    description:
      "A silky, soothing rice porridge with shredded chicken, ginger, and green onion. Popular as a breakfast or comfort food when feeling under the weather.",
    ingredients: ["Jasmine rice", "Chicken", "Ginger", "Green onion", "Sesame oil", "Fish sauce"],
    funFact: "Chao is one of the oldest dishes in Vietnamese cuisine — rice porridge has been eaten in Vietnam for over 2,000 years.",
    imageURL: "https://takestwoeggs.com/wp-content/uploads/2024/01/Chao-Ga-Vietnamese-Chicken-Rice-Porridge-recipe-takestwoeggs-1.jpg",
  },
];

/**
 * 2 extra Data Structures I added: Set (favorites) and Map (ratings)
 * favorites -> a Set stores dish IDs the user has hearted
 * userRatings -> an object stores the star rating the user gave each dish
 */
const favorites = new Set();  // Set chosen over Array: O(1) has/add/delete vs O(n) indexOf
const userRatings = {};       // Object used as a hash map: O(1) key lookup by dish id

/**
 * FEATURE 5 — toggleFavorite(id)
 * Adds or removes a dish id from the favorites Set
 */
function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id); // already favorited -> remove it
  } else {
    favorites.add(id);    // not favorited yet -> add it
  }
  updateStats();    // recalculate the stats bar
  applyFilters();   // re-render cards so the heart icon updates
  renderFavorites(); // update the favorites section
}

/**
 * FEATURE 6 — rateDish(id, rating)
 * Saves the user's star rating for a dish
 */
function rateDish(id, rating) {
  userRatings[id] = rating; // store: { dishId: starRating }
  applyFilters();            // re-render so the star display updates
}

/**
 * FEATURE 7 — updateStats()
 * Recalculates and displays live stats in the header
 */

function updateStats() {
  // Total dishes currently in the array
  document.getElementById("stat-total").textContent = dishes.length;

  // Average spice: O(n) linear traversal to accumulate the sum, then divide
  let totalSpice = 0;
  for (let i = 0; i < dishes.length; i++) {
    totalSpice += dishes[i].spiceLevel;
  }
  const avgSpice = totalSpice / dishes.length;
  document.getElementById("stat-spice").textContent = avgSpice.toFixed(1) + "/5";

  // How many dishes the user has favorited
  document.getElementById("stat-favorites").textContent = favorites.size;
}

/**
 * RENDER FAVORITES — renderFavorites()
 * Shows a section of only the hearted dishes
 */
function renderFavorites() {
  const section = document.getElementById("favorites-section");
  const container = document.getElementById("favorites-container");

  // If nothing is favorited, hide the whole section
  if (favorites.size === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  container.innerHTML = "";

  // Filter dishes to only the favorited ones
  const favoritedDishes = dishes.filter((dish) => favorites.has(dish.id));

  for (const dish of favoritedDishes) {
    const item = document.createElement("div");
    item.className = "fav-item";
    item.innerHTML = `
      <img src="${dish.imageURL}" alt="${dish.name}" />
      <div class="fav-info">
        <p class="fav-name">${dish.name}</p>
        <p class="fav-english">${dish.englishName}</p>
      </div>
      <button class="fav-remove" onclick="toggleFavorite(${dish.id})">✕</button>
    `;
    container.appendChild(item); // Add item to container to display the favorites
  }
}


/**
 * FEATURE 1 + 2 + 3 + 4 — applyFilters()
 * Reads all controls and re-renders cards
 */
function applyFilters() {
  const searchQuery  = document.getElementById("search-input").value.toLowerCase();
  const regionFilter = document.getElementById("region-filter").value;
  const typeFilter   = document.getElementById("type-filter").value;
  const sortOption   = document.getElementById("sort-select").value;

  // FILTER — O(n) pass through the array, keep only dishes matching all 3 conditions
  let results = dishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery) ||
      dish.englishName.toLowerCase().includes(searchQuery) ||
      dish.description.toLowerCase().includes(searchQuery);

    const matchesRegion = regionFilter === "All" || dish.region === regionFilter;
    const matchesType   = typeFilter   === "All" || dish.type   === typeFilter;

    return matchesSearch && matchesRegion && matchesType;
  });

  // SORT — comparator returns negative/zero/positive to tell the engine the order (O(nlogn))
  if      (sortOption === "spice-asc")  results.sort((a, b) => a.spiceLevel - b.spiceLevel);
  else if (sortOption === "spice-desc") results.sort((a, b) => b.spiceLevel - a.spiceLevel);
  else if (sortOption === "name-asc")   results.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortOption === "rated")      results.sort((a, b) => (userRatings[b.id] || 0) - (userRatings[a.id] || 0));

  document.getElementById("result-count").textContent = results.length;
  showCards(results);
}

/**
 * RENDER — showCards(filteredDishes)
 */
function showCards(filteredDishes) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (filteredDishes.length === 0) {
    cardContainer.innerHTML = '<p class="no-results">No dishes found. Try a different search or filter!</p>';
    return;
  }

  for (const dish of filteredDishes) {
    const isFavorited = favorites.has(dish.id);
    const userRating  = userRatings[dish.id] || 0; // 0 means not yet rated

    // Build star rating HTML — 5 stars, filled up to the user's rating
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      starsHTML += `<span class="star ${i <= userRating ? "filled" : ""}"
        onclick="rateDish(${dish.id}, ${i})">★</span>`;
    }

    // Build ingredients list HTML
    let ingredientsHTML = dish.ingredients.map((ing) => `<li>${ing}</li>`).join("");

    // Region color class
    const regionClass = dish.region === "North" ? "region-north"
                      : dish.region === "Central" ? "region-central"
                      : "region-south";

    // Build the entire card as an HTML string using a template literal
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${dish.imageURL}" alt="${dish.name}" class="card-img" />
        <button class="fav-btn ${isFavorited ? "active" : ""}"
          onclick="toggleFavorite(${dish.id})">
          ${isFavorited ? "❤️" : "🤍"}
        </button>
        <span class="card-type-badge">${dish.type}</span>
      </div>
      <div class="card-content">
        <div class="card-top">
          <span class="tag ${regionClass}">${dish.region}</span>
          <span class="spice-text">Spice: ${dish.spiceLevel}/5</span>
        </div>
        <h2 class="card-title">${dish.name}</h2>
        <p class="card-english">${dish.englishName}</p>
        <p class="card-description">${dish.description}</p>
        <div class="star-row">${starsHTML}
          <span class="rating-label">${userRating > 0 ? "Your rating: " + userRating + "/5" : "Rate this dish"}</span>
        </div>
        <div class="card-funfact">💡 ${dish.funFact}</div>
        <p class="ingredients-label">Key Ingredients</p>
        <ul class="card-ingredients">${ingredientsHTML}</ul>
      </div>
    `;

    cardContainer.appendChild(card);
  }
}

/**
 * FEATURE 8 - addDish()
 * Add new dish to the array
 */

function addDish() {
  const nameInput        = document.getElementById("add-name").value.trim();
  const englishInput     = document.getElementById("add-english").value.trim();
  const regionInput      = document.getElementById("add-region").value;
  const typeInput        = document.getElementById("add-type").value;
  const spiceInput       = parseInt(document.getElementById("add-spice").value);
  const descInput        = document.getElementById("add-desc").value.trim();
  const ingredientsInput = document.getElementById("add-ingredients").value.trim();
  const funFactInput     = document.getElementById("add-funfact").value.trim();
  const imageInput       = document.getElementById("add-image").value.trim();

  if (!nameInput || !englishInput || !descInput || !ingredientsInput) {
    alert("Please fill in Name, English Name, Description, and Ingredients.");
    return;
  }

  // "Rice, Pork, Ginger" -> ["Rice", "Pork", "Ginger"]
  const ingredientsArray = ingredientsInput.split(",").map((item) => item.trim());

  const newDish = {
    // Spread all ids, find the highest, +1 to guarantee unique even after removals
    id: dishes.length === 0 ? 1 : Math.max(...dishes.map(d => d.id)) + 1, 
    name: nameInput,
    englishName: englishInput,
    region: regionInput,
    type: typeInput,
    spiceLevel: spiceInput,
    description: descInput,
    ingredients: ingredientsArray,
    funFact: funFactInput || "No fun fact provided yet.",
    imageURL: imageInput || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMU7OIdV7pOsN9hnL2F0nChouwyXjzEgHJHA&s",
  };

  dishes.push(newDish);

  // Clear form
  ["add-name", "add-english", "add-desc", "add-ingredients", "add-funfact", "add-image"].forEach((id) => {
    document.getElementById(id).value = "";
  });

  // Reset filters
  document.getElementById("region-filter").value = "All";
  document.getElementById("type-filter").value   = "All";
  document.getElementById("sort-select").value   = "default";
  document.getElementById("search-input").value  = "";

  updateStats();
  applyFilters();
  populateRemoveDropdown();
  closeAddModal();
  alert(`"${nameInput}" has been added!`);
}

/**
 * FEATURE 9 — removeCard()
 * Removes a dish chosen by name from the dropdown
 */
function populateRemoveDropdown() {
  const select = document.getElementById("remove-select");
  if (!select) return;
  select.innerHTML = '<option value="">-- Choose a dish --</option>';
  for (const dish of dishes) {
    const option = document.createElement("option");
    option.value = dish.name;
    option.textContent = dish.name;
    select.appendChild(option);
  }
}

function removeCard() {
  const select = document.getElementById("remove-select");
  const selectedName = select.value;

  if (!selectedName) {
    alert("Please choose a dish to remove.");
    return;
  }

  const index = dishes.findIndex((dish) => dish.name === selectedName); // O(n) search for the index

  if (index === -1) {
    alert("Dish not found.");
    return;
  }

  const removed = dishes.splice(index, 1)[0]; // splice mutates the array in place, returns the removed element
  favorites.delete(removed.id);
  delete userRatings[removed.id];

  populateRemoveDropdown();
  updateStats();
  applyFilters();
  renderFavorites();
  alert(`"${removed.name}" has been removed.`);
}

/**
 * MODAL — open/close the Add Dish popup
 */
function openAddModal() {
  document.getElementById("add-modal").classList.add("open");
}

function closeAddModal(event) {
  // If called from the overlay click, only close when clicking the backdrop itself
  if (event && event.target !== event.currentTarget) return;
  document.getElementById("add-modal").classList.remove("open");
}

/**
 * INITIALIZE — runs once when the page fully loads
 */
document.addEventListener("DOMContentLoaded", () => {
  updateStats();
  applyFilters();
  renderFavorites();
  populateRemoveDropdown();
});
