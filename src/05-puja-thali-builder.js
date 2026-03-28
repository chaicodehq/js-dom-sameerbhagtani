/**
 * 🪔 Puja Thali Builder - addEventListener & Click Events
 *
 * Online puja thali builder bana rahe hain! Click karke items add karo
 * thali mein - diya, phool, prasad, kumkum, dhoop. addEventListener se
 * buttons pe click handlers lagao. Jaise mummy thali sajati hain ek ek
 * cheez rakh ke, waise hi click events se DOM mein items add/remove karo.
 *
 * Functions:
 *
 *   1. setupAddButton(button, thaliElement, itemName)
 *      - Adds a "click" event listener to button
 *      - On click: creates an li element with textContent = itemName
 *      - Appends the li to thaliElement
 *      - Returns a cleanup function that removes the click listener
 *      - Agar button, thaliElement, or itemName null/undefined, return null
 *
 *   2. setupRemoveButton(button, thaliElement)
 *      - Adds a "click" event listener to button
 *      - On click: removes the LAST child of thaliElement (if it has children)
 *      - Returns a cleanup function that removes the listener
 *      - Agar button or thaliElement null/undefined, return null
 *
 *   3. setupToggleItem(button, thaliElement, itemName)
 *      - Adds a "click" event listener to button
 *      - On click: if thaliElement already has an li with textContent === itemName,
 *        remove that li. If not, create and append a new li with itemName.
 *      - Returns a cleanup function that removes the listener
 *      - Agar any param null/undefined, return null
 *
 *   4. createThaliManager(thaliElement, counterElement)
 *      - Creates a thali management object (no event listeners, direct methods)
 *      - Returns object with:
 *        addItem(name): creates li with textContent=name, appends to thaliElement,
 *          updates counterElement.textContent with new child count. Returns the li.
 *        removeItem(name): finds li with textContent===name in thaliElement,
 *          removes it, updates counter. Returns true if found and removed, false if not.
 *        getCount(): returns number of children in thaliElement
 *        clear(): removes ALL children from thaliElement, updates counter to 0
 *      - Agar thaliElement or counterElement null/undefined, return null
 *
 * Hint: element.addEventListener("click", handler) se listener lagao.
 *   Cleanup ke liye element.removeEventListener("click", handler) use karo.
 *   Named function reference rakhna zaroori hai removal ke liye.
 *
 * @example
 *   const btn = document.createElement("button");
 *   const thali = document.createElement("ul");
 *
 *   const cleanup = setupAddButton(btn, thali, "Diya");
 *   btn.click(); // thali now has <li>Diya</li>
 *   btn.click(); // thali now has 2 <li>Diya</li> items
 *   cleanup();   // listener removed, clicking won't add more
 *
 *   const manager = createThaliManager(thali, counterEl);
 *   manager.addItem("Phool");
 *   manager.getCount(); // => 3 (2 Diya + 1 Phool)
 *   manager.removeItem("Phool"); // => true
 */
export function setupAddButton(button, thaliElement, itemName) {
    if (!button || !thaliElement || !itemName) return null;

    function handler(e) {
        const li = document.createElement("li");
        li.textContent = itemName;

        thaliElement.appendChild(li);
    }

    button.addEventListener("click", handler);

    return () => {
        button.removeEventListener("click", handler);
    };
}

export function setupRemoveButton(button, thaliElement) {
    if (!button || !thaliElement) return null;

    function handler(e) {
        const lastChild = thaliElement.lastElementChild;
        if (lastChild) thaliElement.removeChild(thaliElement.lastElementChild);
    }

    button.addEventListener("click", handler);

    return () => {
        button.removeEventListener("click", handler);
    };
}

export function setupToggleItem(button, thaliElement, itemName) {
    if (!button || !thaliElement || !itemName) return null;

    function handler(e) {
        const lis = thaliElement.querySelectorAll("li");

        let toRemove = null;
        for (const li of lis) {
            if (li.textContent === itemName) {
                toRemove = li;
                break;
            }
        }

        if (toRemove) {
            thaliElement.removeChild(toRemove);
            return;
        }

        const li = document.createElement("li");
        li.textContent = itemName;
        thaliElement.appendChild(li);
    }

    button.addEventListener("click", handler);

    return () => {
        button.removeEventListener("click", handler);
    };
}

export function createThaliManager(thaliElement, counterElement) {
    if (!thaliElement || !counterElement) return null;

    return {
        addItem(name) {
            const li = document.createElement("li");
            li.textContent = name;
            thaliElement.appendChild(li);
            counterElement.textContent = Number(counterElement.textContent) + 1;

            return li;
        },

        removeItem(name) {
            const li = Array.from(thaliElement.querySelectorAll("li")).find(
                (el) => el.textContent === name,
            );

            if (li) {
                thaliElement.removeChild(li);
                counterElement.textContent =
                    Number(counterElement.textContent) - 1;

                return true;
            }

            return false;
        },

        getCount() {
            return Number(counterElement.textContent);
        },

        clear() {
            counterElement.textContent = "0";

            thaliElement.replaceChildren();
        },
    };
}
