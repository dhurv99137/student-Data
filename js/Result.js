
const fetchDataAndDisplay = async () => {
    try {
        const response = await fetch("http://localhost:3000/result");
        const data = await response.json();

        const tableBody = document.getElementById("Data-in-Ui");
        tableBody.innerHTML = "";

        data.forEach((entry, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.roll_no}</td>
                <td>${entry.science}</td>
                <td>${entry.english}</td>
                <td>${entry.maths}</td>
                <td>${parseInt(entry.science) + parseInt(entry.english) + parseInt(entry.maths)}</td>
                <td>${(parseInt(entry.science) + parseInt(entry.english) + parseInt(entry.maths)) / 3 >= 40 ? "Pass" : "Fail"}</td>
                <td><button class="update-btn">Update</button></td>
                <td><button class="delete-btn">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.log(error.message);
    }
};

const sendDataToServer = async (data) => {
    try {
        await fetch("http://localhost:3000/result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        fetchDataAndDisplay();
    } catch (error) {
        console.log(error.message);
    }
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById("name").value,
        roll_no: document.getElementById("roll_no").value,
        science: document.getElementById("science").value,
        english: document.getElementById("english").value,
        maths: document.getElementById("maths").value
    };
    sendDataToServer(data);
};


document.getElementById("Student_Data").addEventListener("submit", handleFormSubmit);


fetchDataAndDisplay();
