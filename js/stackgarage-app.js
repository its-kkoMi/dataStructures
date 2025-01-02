const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
}

const garage = document.getElementById('garage');
const plateInput = document.getElementById('plateInput');
const addCarButton = document.getElementById('addCar');
const removeCarButton = document.getElementById('removeCar');

let stack = [];
let carList = [];

function renderGarage() {
    garage.innerHTML = '';
    stack.forEach(({ plate, color }) => {
        const car = document.createElement('div');
        car.className = 'car';
        car.textContent = plate;
        car.style.backgroundColor = color;

        const window = document.createElement('div');
        window.className = 'window';
        car.appendChild(window);

        garage.appendChild(car);
    });
}

addCarButton.addEventListener('click', () => {
    const plate = plateInput.value.trim();

    if (!plate) {
        plateInput.classList.add('shake');
        setTimeout(() => plateInput.classList.remove('shake'), 500);
        return;
    }

    if (carList.includes(plate)) {
        addCarButton.classList.add('shake');
        setTimeout(() => addCarButton.classList.remove('shake'), 500);
        return;
    }

    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    stack.push({ plate, color: randomColor });
    carList.push(plate);
    plateInput.value = '';
    renderGarage();
});

removeCarButton.addEventListener('click', () => {
    const plate = plateInput.value.trim();
    if (!plate) {
        plateInput.classList.add('shake');
        setTimeout(() => {
            plateInput.classList.remove('shake');
        }, 500);
        return;
    }

    if (!carList.includes(plate)) {
        removeCarButton.classList.add('shake');
        setTimeout(() => {
            removeCarButton.classList.remove('shake');
        }, 500);
        return;
    }

    const tempStack = [];
    let found = false;

    function removeCarsWithDelay() {
        if (stack.length > 0) {
            const topCar = stack.pop();
            tempStack.push(topCar);
            renderGarage();
            if (topCar.plate === plate) {
                found = true;
                carList = carList.filter(p => p !== plate);
                setTimeout(restoreCars, 1000);
                return;
            }
            setTimeout(removeCarsWithDelay, 1000);
        } else {
            if (!found) {
            }
        }
    }

    function restoreCars() {
        if (tempStack.length > 0) {
            const carToReturn = tempStack.pop();
            if (carToReturn.plate !== plate) {
                stack.push(carToReturn);
                renderGarage();
            }
            if (tempStack.length > 0) {
                setTimeout(restoreCars, 1000);
            }
        }
    }

    removeCarsWithDelay();
    plateInput.value = '';
});

renderGarage();