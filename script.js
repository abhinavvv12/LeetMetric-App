document.addEventListener("DOMContentLoaded", function() {

    const searchButton = document.getElementById('user-btn');
    const userNameInput = document.getElementById('user-input');

    const statsContainer = document.querySelector('.stats-container');

    const easyProgressCircle = document.querySelector('.easy-progress');
    const mediumProgressCircle = document.querySelector('.medium-progress');
    const hardProgressCircle = document.querySelector('.hard-progress');

    const easyLabel = document.getElementById('easy-label');
    const mediumLabel = document.getElementById('medium-label');
    const hardLabel = document.getElementById('hard-label');

    const statsCard = document.querySelector('.stats-card');

    function validateUserName(userName){
        if(userName.trim() === ""){
            alert("UserName should not be Empty!!");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(userName);
        if(!isMatching){
            alert("Invalid UserName");
        }
        return isMatching;
    }

    function updateProgress(total,solved,label,circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    async function fetchUserDetails(userName) {
        const url = `https://alfa-leetcode-api.onrender.com/${userName}/solved`;
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;

        try{
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("Unable to fetch the User Details");
            }
            const data = await response.json();
            console.log("Logging data: ",data);

            const solvedProblems = data.solvedProblem;
            const easySolved = data.easySolved;
            const mediumSolved = data.mediumSolved;
            const hardSolved = data.hardSolved;
            // const totalSubmissions = data.totalSubmissionNum;

            const Total = 3958;
            const easyTotal = 885;
            const totalMedium = 1885;
            const totalHard = 1188;

            updateProgress(easyTotal, easySolved, easyLabel,easyProgressCircle);
            updateProgress(totalMedium, mediumSolved, mediumLabel,mediumProgressCircle);
            updateProgress(totalHard, hardSolved, hardLabel,hardProgressCircle);

            const totalSubmissions = (data.totalSubmissionNum[0].submissions);
            const easySubmissions = (data.totalSubmissionNum[1].submissions);
            const mediumSubmissions = (data.totalSubmissionNum[2].submissions);
            const hardSubmissions = (data.totalSubmissionNum[3].submissions);

            statsCard.innerHTML = `
                <div class = "card">
                <h3>Total Submissions</h3>
                <p>${totalSubmissions}</p>
                </div>

                <div class = "card">
                <h3>Easy Submissions</h3>
                <p>${easySubmissions}</p>
                </div>

                <div class = "card">
                <h3>Medium Submissions</h3>
                <p>${mediumSubmissions}</p>
                </div>

                <div class = "card">
                <h3>Hard Submissions</h3>
                <p>${hardSubmissions}</p>
                </div>
                `

            searchButton.textContent = "Search";
        }

        catch(error) {
            statsContainer.innerHTML = `<p>No Data Found</p>`
            console.log("Unable to find the user");
        }
        finally{
            // searchButton.textContent = "Search";
            searchButton.disabled = false;
        }

    }

    searchButton.addEventListener('click', function() {
        const userName = userNameInput.value;
        console.log(userName);
        if(validateUserName(userName)){
            fetchUserDetails(userName);
        }

    })
})

