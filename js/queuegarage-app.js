const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
}

const plateInput = document.getElementById('plateInput');
const addCarButton = document.getElementById('addCar');
const removeCarButton = document.getElementById('removeCar');
const garage = document.getElementById('garage');

let queue = [];
let carList = [];

function renderGarage() {
    garage.innerHTML = '';
    queue.forEach(({ plate, color }) => {
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
    queue.push({ plate, color: randomColor });
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

    const tempQueue = [];
    let found = false;

    function removeCarsUntilFound() {
        if (queue.length > 0) {
            const frontCar = queue.shift();
            tempQueue.push(frontCar);
            renderGarage();

            if (frontCar.plate === plate) {
                found = true;
                setTimeout(restoreCars, 1000);
                return;
            }

            setTimeout(removeCarsUntilFound, 1000);
        } else {
            if (!found) {
            }
        }
    }

    function restoreCars() {
        if (tempQueue.length > 0) {
            const carToReturn = tempQueue.shift();
            if (carToReturn.plate !== plate) {
                queue.push(carToReturn);
                renderGarage();
            }

            if (tempQueue.length > 0) {
                setTimeout(restoreCars, 1000);
            }
        }

        if (found) {
            carList = carList.filter(p => p !== plate);
        }
    }

    removeCarsUntilFound();
    plateInput.value = '';
});

renderGarage();
