const activityTypes = []; //Holds the activity types selected by user
const activityGroups = []; //Holds the activity groups selected by user
const activityFacilities = []; ////Holds the activity facilities selected by user

const filterOption = {
    activityTypes: activityTypes,
    searchKeyword: "",
    activityGroup: activityGroups,
    activityFacilities: activityFacilities,
    sorting: "asc"
};


//Getting the data from the JSON file and generate activities HTML data
applyActivityData(filterOption);


//Add-remove items to-from activityTypes array, then match the data with the array
const types = document.querySelectorAll(".activities__filterType");
types.forEach((checkBox) => {
    checkBox.addEventListener("click", () =>
        applyActivityTypesFilter(checkBox.value, checkBox.checked)
    );
});


//Add-remove items to-from activityGroups array, then match the data with the array
const groups = document.querySelectorAll(".activities__filterGroup");
groups.forEach((checkBox) => {
    checkBox.addEventListener("click", () =>
        applyActivityGroupFilter(checkBox.value, checkBox.checked)
    );
});


//Add-remove items to-from activityFacilities array, then match the data with the array
const facilities = document.querySelectorAll(".activities__facilityIconWrapper input[type='checkbox']");
facilities.forEach((checkBox) => {
    checkBox.addEventListener("click", () =>
        applyActivityFacilitiesFilter(checkBox.value, checkBox.checked)
    );
});


//Get search input form user, then match the data with the search input
let timeoutId;
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => applySearch(searchInput.value), 1000);
});


//Sort the data Asc or Desc
const sorting = document.getElementById("sorting");
sorting.addEventListener("change", () => sortResult(sorting.value))


function applyActivityTypesFilter(type, checked) {
    if (checked) {
        activityTypes.push(type);
    } else {
        const index = activityTypes.indexOf(type);
        if (index > -1) {
            activityTypes.splice(index, 1);
        }
    }

    console.log("Selected user activity types: " + activityTypes)
    applyActivityData(filterOption);
}

function applyActivityGroupFilter(type, checked) {
    if (checked) {
        activityGroups.push(type);
    } else {
        const index = activityGroups.indexOf(type);
        if (index > -1) {
            activityGroups.splice(index, 1);
        }
    }

    console.log("Selected user activity group: " + activityGroups)
    applyActivityData(filterOption);
}

function applyActivityFacilitiesFilter(type, checked) {
    if (checked) {
        activityFacilities.push(type);
    } else {
        const index = activityFacilities.indexOf(type);
        if (index > -1) {
            activityFacilities.splice(index, 1);
        }
    }

    console.log("Selected user activity facilities: " + activityFacilities);
    applyActivityData(filterOption);
}

function applySearch(searchKeyword) {
    filterOption.searchKeyword = searchKeyword;

    console.log("New search input: " + searchKeyword);
    applyActivityData(filterOption);
}

function sortResult(value) {
    filterOption.sorting = value;

    console.log("Sorting data " + value)
    applyActivityData(filterOption);
}


async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}


const DISABLED_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M9 6.5C10.1046 6.5 11 5.60457 11 4.5C11 3.39543 10.1046 2.5 9 2.5C7.89543 2.5 7 3.39543 7 4.5C7 5.60457 7.89543 6.5 9 6.5Z" fill="white"/>
  <path d="M16.9799 15.304C16.9346 15.0774 16.8122 14.8735 16.6336 14.7269C16.4549 14.5803 16.231 14.5001 15.9999 14.5H11.8669L11.4379 11.5H15.9999V9.5H11.1529L10.9899 8.358C10.9558 8.1198 10.8368 7.90191 10.655 7.74431C10.4731 7.58671 10.2406 7.49997 9.99992 7.5H8.99992C8.85674 7.50047 8.71533 7.5316 8.58518 7.59128C8.45503 7.65096 8.33916 7.73781 8.24538 7.846C8.15159 7.95419 8.08205 8.0812 8.04144 8.2185C8.00083 8.3558 7.99008 8.5002 8.00992 8.642L8.88692 14.784C8.95704 15.2596 9.19538 15.6943 9.55869 16.0092C9.92199 16.3241 10.3862 16.4982 10.8669 16.5H15.1799L16.0189 20.696C16.1129 21.163 16.5229 21.5 16.9999 21.5H19.9999V19.5H17.8189L16.9799 15.304Z" fill="white"/>
  <path d="M12.51 18C11.771 19.476 10.26 20.5 8.5 20.5C7.30693 20.4987 6.16311 20.0241 5.31948 19.1805C4.47585 18.3369 4.00132 17.1931 4 16C4.00168 15.104 4.27064 14.2288 4.77246 13.4865C5.27428 12.7442 5.98615 12.1685 6.817 11.833L6.528 9.80798C3.905 10.645 2 13.104 2 16C2 19.584 4.916 22.5 8.5 22.5C9.6148 22.4984 10.7104 22.2101 11.6816 21.6626C12.6527 21.1151 13.4666 20.327 14.045 19.374L13.771 18H12.51Z" fill="white"/>
</svg>
`;

const WC_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M0 4C0 2.93913 0.316071 1.92172 0.87868 1.17157C1.44129 0.421427 2.20435 0 3 0H21C21.7956 0 22.5587 0.421427 23.1213 1.17157C23.6839 1.92172 24 2.93913 24 4V20C24 21.0609 23.6839 22.0783 23.1213 22.8284C22.5587 23.5786 21.7956 24 21 24H3C2.20435 24 1.44129 23.5786 0.87868 22.8284C0.316071 22.0783 0 21.0609 0 20V4ZM17.499 7.78C18.522 7.78 19.2075 8.72 19.2795 9.994H21V9.774C20.9205 7.4 19.464 5.774 17.487 5.774C15.081 5.774 13.71 7.874 13.71 11.276V12.77C13.71 16.17 15.0675 18.23 17.487 18.23C19.458 18.23 20.9145 16.646 21 14.352V14.124H19.2795C19.2075 15.354 18.534 16.224 17.499 16.224C16.2405 16.224 15.522 14.984 15.522 12.77V11.286C15.522 9.062 16.254 7.78 17.499 7.78ZM8.217 9.632H8.283L9.813 18H11.322L13.5 6.002H11.727L10.497 14.712H10.413L8.955 6.002H7.545L6.087 14.712H6.0075L4.767 6.002H3L5.178 18H6.6855L8.217 9.632Z" fill="white"/>
</svg>`;

const DIAPER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M14 8.5V10.5H11L8.31 9.32L7 13.25V22.5H3V12.5L4.58 7.87C4.66895 7.60484 4.81244 7.36125 5.00123 7.15491C5.19002 6.94857 5.41994 6.78405 5.67617 6.67195C5.93239 6.55985 6.20926 6.50265 6.48893 6.50404C6.76861 6.50542 7.04489 6.56536 7.3 6.68L11.45 8.51L14 8.5ZM8 1.5C6.9 1.5 6 2.4 6 3.5C6 4.6 6.9 5.5 8 5.5C9.1 5.5 10 4.6 10 3.5C10 2.4 9.1 1.5 8 1.5ZM9 19.5H21V17.5H9V19.5ZM19.5 16.5C20.33 16.5 21 15.83 21 15C21 14.17 20.33 13.5 19.5 13.5C18.67 13.5 18 14.17 18 15C18 15.83 18.67 16.5 19.5 16.5ZM13 12.5C13 11.95 12.55 11.5 12 11.5H9V13.5H11V14.5C11 15.6 11.9 16.5 13 16.5H15C16.1 16.5 17 15.6 17 14.5V11.5H15V13.5H13V12.5Z" fill="white"/>
</svg>`;

const DOG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path d="M12.4795 7.15601L9.7595 1.84401C9.60026 1.46318 9.67232 1.00327 9.9391 0.788022C10.2442 0.588192 10.5887 0.681597 10.7602 1.01199L13.4802 6.35599C13.6394 6.73682 13.5675 7.19691 13.3006 7.412C12.9963 7.59492 12.6234 7.47086 12.4795 7.15601ZM23.8983 8.148C24.3358 9.13712 23.2513 9.94806 22.7436 10.292C22.2988 10.2491 21.8754 10.1905 21.4734 10.116C21.0713 10.0413 20.7164 9.972 20.4085 9.90798C20.0492 9.82263 19.7156 9.73733 19.4077 9.65195C19.3729 9.86533 19.3258 10.0893 19.2666 10.3239C19.2064 10.5586 19.1337 10.8039 19.0485 11.0599C17.2993 10.588 15.2393 9.31148 14.2757 7.34795L17.5602 3.156L18.1504 0.5L19.4077 2.42C20.2751 2.72409 21.4785 2.74544 21.8455 3.85999C22.1632 4.52762 22.1375 5.94349 22.487 6.48399C22.6751 6.71864 22.8804 6.93198 23.1028 7.12398C23.3252 7.31598 23.5904 7.65735 23.8983 8.148ZM11.5814 17.044C10.804 17.0371 9.99274 16.7008 9.22064 16.692C8.77588 16.6281 8.61334 16.8734 8.73308 17.428L9.81082 22.836C9.79634 23.7047 9.41792 24.3699 8.8614 24.484C8.31982 24.5489 7.77518 23.9396 7.65536 23.476L6.26969 16.692C6.23549 16.4574 6.12855 16.3454 5.94893 16.356C5.76931 16.3667 5.65385 16.4787 5.60251 16.692L4.31951 23.444C4.15035 24.0776 3.74035 24.4923 3.24179 24.5C2.50579 24.4839 1.99759 23.6313 2.13841 22.836L3.70369 14.836L3.83199 10.0041C2.47527 9.57481 0.760789 8.41734 0.085608 6.80403C-0.104852 6.28254 0.033188 5.77673 0.393528 5.52405C0.819449 5.28132 1.30121 5.51502 1.47125 5.87602C2.13559 7.17274 3.60215 7.9991 4.60179 8.02002H12.2485C11.7754 10.9794 11.5107 13.9389 11.5814 17.044ZM13.4546 8.56402C14.7499 10.6646 16.6166 11.981 18.6123 12.5C18.4265 13.1934 18.1784 13.868 18.0093 14.5C17.9323 14.788 17.9537 15.2093 18.0734 15.764C18.5651 18.1133 19.1058 20.6214 19.5874 22.804C19.7749 24.6322 17.739 24.5932 17.4319 23.476L16.3285 18.228C16.024 17.5835 15.2626 17.4331 15.0968 18.228L14.0961 23.444C13.5782 25.0545 11.7305 23.9717 11.9407 22.836L12.8901 17.972C12.9072 17.8013 12.8986 17.6306 12.8644 17.46C12.8809 14.4964 12.9568 11.4642 13.4546 8.56402Z" fill="white"/>
</svg>`;


function applyActivityData(filterOption) {
    fetchData("data.json")
        .then((result) => {
            let filteredResult = filterActivities(result, filterOption);

            if(filterOption.sorting === "asc") {
                filteredResult = filteredResult.sort((a, b) => a.name.localeCompare(b.name))
            } else {
                filteredResult = filteredResult.sort((a, b) =>  b.name.localeCompare(a.name))
            }

            renderActivities(filteredResult);
        });
}

//Combine all filters
function filterActivities(activities, filterOption) {
    return activities.filter(activity => {
        return (
            matchType(activity, filterOption.activityTypes) &&
            matchGroup(activity, filterOption.activityGroup) &&
            matchKeyword(activity, filterOption.searchKeyword) &&
            matchFacilities(activity, filterOption.activityFacilities)
        );
    });
}

function matchType(activity, types) {
    return types.length === 0 || types.includes(activity.type);
}

function matchGroup(activity, groups) {
    return groups.length === 0 || groups.includes(activity.group);
}

function matchKeyword(activity, keyword) {
    if (!keyword) return true;
    const lowerKeyword = keyword.toLowerCase();
    return activity.name.toLowerCase().includes(lowerKeyword) ||
        activity.desc.toLowerCase().includes(lowerKeyword);
}

function matchFacilities(activity, facilities) {
    return facilities.length === 0 || facilities.every(facility => activity.facilities.includes(facility));
}

//Render activities based on the JSON data
function renderActivities(activities) {
    const activityContainer = document.querySelector(".activities__container");
    activityContainer.innerHTML = "";

    activities.forEach(activity => {
        activityContainer.innerHTML += `
      <article class="activity">
        <img src="${activity.img}" alt="" />
        <section class="activity__details">
          <span class="activity__name">${activity.name}</span>
          <span class="activity__desc">${activity.desc.substring(0, 300)}</span>
          <section class="activity__links">
            <a href="#" class="primaryLink primaryLink--xs">Læse mere</a>
            <section class="activity__showOnMap">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path d="M7.00293 8.57213C6.38725 8.57213 5.79678 8.34672 5.36143 7.9455C4.92608 7.54428 4.6815 7.0001 4.6815 6.43269C4.6815 5.86527 4.92608 5.3211 5.36143 4.91988C5.79678 4.51865 6.38725 4.29325 7.00293 4.29325C7.61861 4.29325 8.20907 4.51865 8.64443 4.91988C9.07978 5.3211 9.32436 5.86527 9.32436 6.43269C9.32436 6.71364 9.26431 6.99185 9.14765 7.25142C9.03099 7.51098 8.85999 7.74683 8.64443 7.9455C8.42886 8.14417 8.17295 8.30175 7.8913 8.40927C7.60965 8.51679 7.30778 8.57213 7.00293 8.57213ZM7.00293 0.442261C5.27902 0.442261 3.62572 1.07339 2.40674 2.19682C1.18775 3.32024 0.50293 4.84393 0.50293 6.43269C0.50293 10.9255 7.00293 17.5578 7.00293 17.5578C7.00293 17.5578 13.5029 10.9255 13.5029 6.43269C13.5029 4.84393 12.8181 3.32024 11.5991 2.19682C10.3801 1.07339 8.72684 0.442261 7.00293 0.442261Z" fill="#574837" />
              </svg>
              <a href="${activity.location}" class="primaryLink primaryLink--xs">Vis på kort</a>
            </section>
          </section>
          <section class="activity__info">
            <section class="activity__location">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path d="M7.00293 8.57213C6.38725 8.57213 5.79678 8.34672 5.36143 7.9455C4.92608 7.54428 4.6815 7.0001 4.6815 6.43269C4.6815 5.86527 4.92608 5.3211 5.36143 4.91988C5.79678 4.51865 6.38725 4.29325 7.00293 4.29325C7.61861 4.29325 8.20907 4.51865 8.64443 4.91988C9.07978 5.3211 9.32436 5.86527 9.32436 6.43269C9.32436 6.71364 9.26431 6.99185 9.14765 7.25142C9.03099 7.51098 8.85999 7.74683 8.64443 7.9455C8.42886 8.14417 8.17295 8.30175 7.8913 8.40927C7.60965 8.51679 7.30778 8.57213 7.00293 8.57213ZM7.00293 0.442261C5.27902 0.442261 3.62572 1.07339 2.40674 2.19682C1.18775 3.32024 0.50293 4.84393 0.50293 6.43269C0.50293 10.9255 7.00293 17.5578 7.00293 17.5578C7.00293 17.5578 13.5029 10.9255 13.5029 6.43269C13.5029 4.84393 12.8181 3.32024 11.5991 2.19682C10.3801 1.07339 8.72684 0.442261 7.00293 0.442261Z" fill="#574837" />
              </svg>
              <span>Sønderborg</span>
            </section>
            <section class="activity__facilities">
              ${setFacilitiesIcons(activity.facilities)}
            </section>
            <section class="activity__date">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7957 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7957 4 19 4ZM5 9H19V19H5V9ZM5 7V5H7V6C7 6.26522 7.10536 6.51957 7.29289 6.70711C7.48043 6.89464 7.73478 7 8 7C8.26522 7 8.51957 6.89464 8.70711 6.70711C8.89464 6.51957 9 6.26522 9 6V5H15V6C15 6.26522 15.1054 6.51957 15.2929 6.70711C15.4804 6.89464 15.7348 7 16 7C16.2652 7 16.5196 6.89464 16.7071 6.70711C16.8946 6.51957 17 6.26522 17 6V5H19V7H5Z" fill="#574837" />
              </svg>
              <span>${activity.start} til ${activity.end}</span>
            </section>
          </section>
        </section>
      </article>
    `;
    });
}

//Generate facilities icons based on JSON data
function setFacilitiesIcons(facilities) {
    let innerHtml = "";
    facilities.forEach((facility) => {
        switch (facility) {
            case "dog":
                innerHtml += `<section class="activities__facilityIcon activities__facilityIcon--sm">${DOG_ICON}</section>`;
                break;
            case "diaper":
                innerHtml += `<section class="activities__facilityIcon activities__facilityIcon--sm">${DIAPER_ICON}</section>`;
                break;
            case "wc":
                innerHtml += `<section class="activities__facilityIcon activities__facilityIcon--sm">${WC_ICON}</section>`;
                break;
            case "disabled":
                innerHtml += `<section class="activities__facilityIcon activities__facilityIcon--sm">${DISABLED_ICON}</section>`;
                break;
        }
    });
    return innerHtml;
}
