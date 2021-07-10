// GETTING THE INPUT VALUE
const buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', function () {
    const inputText = document.getElementById('filter-jobs').value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, inputText);
        console.log(filteredJobs);
        showJobs(filteredJobs);
    })
});

// GETTING THE DATA FROM THE JSON FILE AND PUTTING THEM IN THE WEBPAGE
function getJobs() {
    return fetch('data.json')
    .then(response => response.json())
    .then(data => {
        return data;
    });
}

function showJobs(jobs) {
    let jobsContainer = document.querySelector('.jobs-container');
    let jobsHTML = '';

    jobs.forEach((job) => {
        jobsHTML += `
            <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" alt="">
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">Apply Now</div>
                    <div class="button">Message</div>
                </div>
            </div>
        `
    });
    jobsContainer.innerHTML = jobsHTML;
}

getJobs().then(data => {
    showJobs(data);
});

// FILTER JOBS
function filterJobs(jobs, searchText) {
    if(searchText) {
        let filteredJobs = jobs.filter(job => {
            if (job.roleName.toLowerCase().includes(searchText)
                || job.type.toLowerCase().includes(searchText)
                ||  job.company.toLowerCase().includes(searchText)
                ||  job.requirements.content.toLowerCase().includes(searchText)
            ) {
                return true;
            } else {
                return false;
            }
        });
        return filteredJobs;
    } else {
        return jobs;
    }
}