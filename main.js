const currentDate = new Date();
const currentYear = currentDate.getFullYear();
document.getElementById("currentYear").textContent = currentYear;



  // Get the navbar element
  window.addEventListener('scroll', function () {
    var navbar = document.getElementById('mainNavbar');

    if (window.scrollY > 0) {
      navbar.classList.add('top-0');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('top-0');
      navbar.classList.remove('scrolled');
    }
});




var app = Vue.createApp({
  data() {
    return {
      msg: "Connected",
      jobs: [
        {
          id: 1,
          title: "General Manager",
          location: "Uttara, Dhaka",
          jobType: "Full Time",
          vacancy: "Not specific",
          applyLastDate: "2023-12-15"
        },
        {
          id: 2,
          title: "Assistant Manager",
          location: "Uttara, Dhaka",
          jobType: "Full Time",
          vacancy: "Not specific",
          applyLastDate: "2023-12-15"
        },
        {
          id: 3,
          title: "Sales Manager",
          location: "Uttara, Dhaka",
          jobType: "Full Time",
          vacancy: "Not specific",
          applyLastDate: "2023-12-15"
        },
        {
          id: 4,
          title: "Field Officer",
          location: "Uttara, Dhaka",
          jobType: "Full Time",
          vacancy: "Not specific",
          applyLastDate: "2023-12-15"
        },
      ],
      selectedJob: "",
      blogs: [
        {
          id: 1,
          img: "../images/blog-1.jpg",
          title: "Smile Drinking Water",
          description: "Smile Drinking Water is one of the most popular and beautiful water company in bangladesh. Smile Drinking Water is one of the most popular and beautiful water company in bangladesh. Smile Drinking Water is one of the most popular and beautiful water company in bangladesh",
          date: "27/11/2023"
        },
        {
          id: 2,
          img: "../images/blog-2.jpg",
          title: "Smile Drinking Water",
          description: "Smile Drinking Water is one of the most popular and beautiful water company in bangladesh. Smile Drinking Water is one of the most popular and beautiful water company in bangladesh. Smile Drinking Water is one of the most popular and beautiful water company in bangladesh",
          date: "22/11/2023"
        },
        {
          id: 3,
          img: "../images/blog-3.jpg",
          title: "Smile Drinking Water",
          description: "Smile Drinking Water is one of the most popular and beautiful water company in bangladesh. Smile Drinking Water is one of the most popular and beautiful water company in bangladesh. Smile Drinking Water is one of the most popular and beautiful water company in bangladesh",
          date: "26/11/2023"
        },
        {
          id: 4,
          img: "../images/blog-4.jpeg",
          title: "Smile Drinking Water",
          description: "Smile Drinking Water is one of the most popular and beautiful water company in bangladesh. Smile Drinking Water is one of the most popular and beautiful water company in bangladesh. Smile Drinking Water is one of the most popular and beautiful water company in bangladesh",
          date: "28/11/2023"
        },
      ]
   }
  },

  computed: {
    sortedBlogs() {
      // Sort blogs by date in descending order
      return this.blogs.slice().sort((a, b) => {
        const dateA = new Date(this.convertDateFormat(a.date));
        const dateB = new Date(this.convertDateFormat(b.date));
        return dateB - dateA;
      });
    },
  },
  methods: {
    convertDateFormat(dateString) {
      // Convert date format from DD/MM/YYYY to YYYY-MM-DD
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    },

    selectJob(post) {
      this.selectedJob = post
    }
  },


});


app.component('order-online', {
  
  data(){
    return{
      msg: "Vue Working",
      divisions: [],
      districts: [],
      unions: [],
      upazilas: [],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      division: "",
      district: "",
      upazila: "",
      union: "",
      fullAddress: "",
      service: ""
    }
  },
  mounted() {
// Fetch divisions data
fetch('http://localhost:5173/divisions.json')
.then(res => res.json())
.then(data => {
  // Assign the fetched data to the component property
  this.divisions = data[2].data.sort((a, b) => a.name.localeCompare(b.name));
})
.catch(error => {
  console.error('Error fetching divisions data:', error);
});


},

methods: {
selectedDivision(selectDivision) {
if(!selectDivision){
  return this.districts = "";
}

    // Fetch districts data
fetch('http://localhost:5173/districts.json')
.then(res => res.json())
.then(data => {
  this.districts = data[2].data.sort((a, b) => a.name.localeCompare(b.name)).filter((dis) => dis.division_id === selectDivision.target.value);
})
.catch(error => {
  console.error('Error fetching districts data:', error);
});
},
selectedDistrict(selectDistrict) {
  if(!selectDistrict){
    return this.upazilas = "";
  }
  
// Fetch upazilas data
fetch('http://localhost:5173/upazilas.json')
.then(res => res.json())
.then(data => {
  this.upazilas = data[2].data.sort((a, b) => a.name.localeCompare(b.name)).filter((upa) => upa.district_id === selectDistrict.target.value);
})
.catch(error => {
  console.error('Error fetching upazilas data:', error);
});
},
selectedUpazila(selectUpazila) {
  if(!selectUpazila){
    return this.unions = "";
  }
//  // Fetch unions data
fetch('http://localhost:5173/unions.json')
.then(res => res.json())
.then(data => {
  this.unions = data[2].data.sort((a, b) => a.name.localeCompare(b.name)).filter((uni) => uni.upazilla_id === selectUpazila.target.value);
})
.catch(error => {
  console.error('Error fetching unions data:', error);
});
  },


  submitForm() {
    // You can access the form data here and perform any additional actions

    const divisionName = this.divisions.find(div => div.id == this.division).name;
    const districtName = this.districts.find(dis => dis.id == this.district).name;
    const upazilaName = this.upazilas.find(upa => upa.id == this.upazila).name;
    const unionName = this.unions.find(uni => uni.id == this.union).name;
    

    const data = {
      "First Name ": this.firstName,
      "Last Name ": this.lastName,
      "Email ": this.email,
      "Phone ": this.phone,
      "Division ": divisionName,
      "District ": districtName,
      "Upazila ": upazilaName,
      "Union ": unionName,
      "Full Address ": this.fullAddress,
      "Service ": this.service
     }

      console.log(data);
 
    
    // Assuming you have a toast component, you can use it to display a success message

  },



  },

  template: `
  <dialog id="my_modal_2" class="modal">
  <div class="modal-box rounded-sm p-0">
    <div class=" border-b  py-3 px-4">
      <h1 class="md:text-h2 text-center text-xl sm:text-2xl font-bold text-primary">Order Online</h1>
    </div>

    <div class="">
      <!-- Form -->
      <form @submit.prevent="submitForm">
        <div class="grid gap-y-4 p-4">
          <!-- Form Group -->
          <div class="overflow-y-auto">
            <div class="sm:flex grid gap-5 items-center w-full">
              <div class="relative sm:w-1/2 w-full">
                <input v-model="firstName" type="text"
                  class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary  focus:ring-primary focus:outline-primary  disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Enter First Name">
                <div
                  class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>

              <div class="relative sm:w-1/2 w-full">
                <input v-model="lastName" type="text" 
                  class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary  focus:ring-primary focus:outline-primary  disabled:opacity-50 disabled:pointer-events-none "
                  placeholder="Enter Last Name">
                <div
                  class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="sm:flex grid gap-5 items-center w-full my-5">
              <div class="relative sm:w-1/2 w-full">
                <input v-model="email" type="email" 
                  class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Enter Email">
                <div
                  class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg class="fill-gray-500" xmlns="http://www.w3.org/2000/svg" height="1em"
                    viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                  </svg>
                </div>
              </div>

              <div class="relative sm:w-1/2 w-full">
                <input v-model="phone" type="tel"
                  class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Enter Phone">
                <div
                  class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="flex-shrink-0 w-4 h-4 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
              </div>
            </div>
            

            <div class="sm:flex grid gap-5">
              <div class="relative  sm:w-1/2 w-full">
                  <select v-model="division" @change="selectedDivision" id="division" class="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none 
                  
                  focus:pt-6
                  focus:pb-2
                  [&:not(:placeholder-shown)]:pt-6
                  [&:not(:placeholder-shown)]:pb-2
                  autofill:pt-6
                  autofill:pb-2">
                  <option selected>Choose Your Division</option>
                    <option v-for="division in divisions" :key="division.id" :value="division.id">{{division.name}}</option>
              
                  </select>
                  <label for="division" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs
                    peer-focus:-translate-y-1.5
                    peer-focus:text-gray-500
                    peer-[:not(:placeholder-shown)]:text-xs
                    peer-[:not(:placeholder-shown)]:-translate-y-1.5
                    peer-[:not(:placeholder-shown)]:text-gray-500">Division</label>
              </div>
              <div class="relative  sm:w-1/2 w-full">
                  <select v-model="district" @change="selectedDistrict" id="district" class="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none 
                  focus:pt-6
                  focus:pb-2
                  [&:not(:placeholder-shown)]:pt-6
                  [&:not(:placeholder-shown)]:pb-2
                  autofill:pt-6
                  autofill:pb-2">
                  <option selected>Choose Your District</option>
                    <option v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
                  </select>
                  <label for="district" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs
                    peer-focus:-translate-y-1.5
                    peer-focus:text-gray-500
                    peer-[:not(:placeholder-shown)]:text-xs
                    peer-[:not(:placeholder-shown)]:-translate-y-1.5
                    peer-[:not(:placeholder-shown)]:text-gray-500">District</label>
              </div>
            </div>
            
            <div class="sm:flex grid gap-5 my-5">
              <div class="relative  sm:w-1/2 w-full">
                  <select v-model="upazila" @change="selectedUpazila" id="upazila" class="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none 
                  focus:pt-6
                  focus:pb-2
                  [&:not(:placeholder-shown)]:pt-6
                  [&:not(:placeholder-shown)]:pb-2
                  autofill:pt-6
                  autofill:pb-2">
                  <option selected>Choose Your Upazila</option>
                    <option v-for="upazila in upazilas" :key="upazila.id" :value="upazila.id">{{upazila.name}}</option>
                  </select>
                  <label for="upazila" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs
                    peer-focus:-translate-y-1.5
                    peer-focus:text-gray-500
                    peer-[:not(:placeholder-shown)]:text-xs
                    peer-[:not(:placeholder-shown)]:-translate-y-1.5
                    peer-[:not(:placeholder-shown)]:text-gray-500">Upazila</label>
              </div>
              <div class="relative  sm:w-1/2 w-full">
                  <select v-model="union" class="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none 
                  focus:pt-6
                  focus:pb-2
                  [&:not(:placeholder-shown)]:pt-6
                  [&:not(:placeholder-shown)]:pb-2
                  autofill:pt-6
                  autofill:pb-2">
                  <option selected>Choose Your Union</option>
                    <option v-for="union in unions" :key="union.id" :value="union.id">{{union.name}}</option>
                  </select>
                  <label for="union" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs
                    peer-focus:-translate-y-1.5
                    peer-focus:text-gray-500
                    peer-[:not(:placeholder-shown)]:text-xs
                    peer-[:not(:placeholder-shown)]:-translate-y-1.5
                    peer-[:not(:placeholder-shown)]:text-gray-500">Union</label>
              </div>
            </div>


            <div class="relative my-5">
              <div class="relative">
                <input v-model="fullAddress" type="text"
                  class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Enter Full Address">
                <div
                  class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="flex-shrink-0 w-4 h-4 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <select v-model="service"
                class="py-3 px-4 pe-9 block w-full bg-gray-100  rounded-sm text-sm focus:border-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none ">
                <option disabled selected>— Select —</option>
                <option value="Mai Alkaline 500 ML" data-id="254">Mai Alkaline 500 ML</option>
                <option value="Mai Alkaline 1.5 LTR" data-id="251">Mai Alkaline 1.5 LTR</option>
                <option value="Manual Water Pump with 5 Gallon  Returnable Bottle" data-id="256">Manual Water
                  Pump with 5 Gallon Returnable Bottle</option>
                <option value="SIFR 500 ML" data-id="148">SIFR 500 ML</option>
                <option value="SIFR 1.5 LTR" data-id="154">SIFR 1.5 LTR</option>
                <option value="SIFR 5 Gallon" data-id="156">SIFR 5 Gallon</option>
                <option value="5G - Returnable" data-id="152">5G - Returnable</option>
                <option value="4G - Non Returnable" data-id="141">4G - Non Returnable</option>
                <option value="5 LTR" data-id="146">5 LTR</option>
                <option value="1.5 LTR" data-id="150">1.5 LTR</option>
                <option value="500 ML" data-id="135">500 ML</option>
                <option value="330 ML" data-id="139">330 ML</option>
                <option value="200 ML" data-id="133">200 ML</option>
                <option value="Cup 100ml/200ml" data-id="252">Cup 100ml/200ml</option>
              </select>
            </div>

          </div>
          <!-- End Form Group -->
          <button type="submit"
            class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-primary text-white hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none">Submit</button>
        </div>
      </form>
      <!-- End Form -->

    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
 
</dialog>
  `
})






app.component('application-form', {
  props: ['job'],
  data() {
    
    return {
      msg: "Vue Working",
      divisions: [],
      districts: [],
      unions: [],
      upazilas: [],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      division: "",
      district: "",
      upazila: "",
      union: "",
      fullAddress: "",
      cv: null,

   
  
    }
  },
mounted() {

// Fetch divisions data
fetch('http://localhost:5173/divisions.json')
.then(res => res.json())
.then(data => {
  // Assign the fetched data to the component property
  this.divisions = data[2].data.sort((a, b) => a.name.localeCompare(b.name));
})
.catch(error => {
  console.error('Error fetching divisions data:', error);
});


},

methods: {
selectedDivision(selectDivision) {
if(!selectDivision){
  return this.districts = "";
}

    // Fetch districts data
fetch('http://localhost:5173/districts.json')
.then(res => res.json())
.then(data => {
  this.districts = data[2].data.sort((a, b) => a.name.localeCompare(b.name)).filter((dis) => dis.division_id === selectDivision.target.value);
})
.catch(error => {
  console.error('Error fetching districts data:', error);
});
},
selectedDistrict(selectDistrict) {
  if(!selectDistrict){
    return this.upazilas = "";
  }
  
// Fetch upazilas data
fetch('http://localhost:5173/upazilas.json')
.then(res => res.json())
.then(data => {
  this.upazilas = data[2].data.sort((a, b) => a.name.localeCompare(b.name)).filter((upa) => upa.district_id === selectDistrict.target.value);
})
.catch(error => {
  console.error('Error fetching upazilas data:', error);
});
},
selectedUpazila(selectUpazila) {
  if(!selectUpazila){
    return this.unions = "";
  }
//  // Fetch unions data
fetch('http://localhost:5173/unions.json')
.then(res => res.json())
.then(data => {
  this.unions = data[2].data.sort((a, b) => a.name.localeCompare(b.name)).filter((uni) => uni.upazilla_id === selectUpazila.target.value);
})
.catch(error => {
  console.error('Error fetching unions data:', error);
});
  },

  handleFileChange(event) {
    // Update the 'cv' data property with the selected file
    this.cv = event.target.files[0];
  },

  submitForm() {
    // You can access the form data here and perform any additional actions

    const divisionName = this.divisions.find(div => div.id == this.division).name;
    const districtName = this.districts.find(dis => dis.id == this.district).name;
    const upazilaName = this.upazilas.find(upa => upa.id == this.upazila).name;
    const unionName = this.unions.find(uni => uni.id == this.union).name;
    

    const data = {
      "First Name": this.firstName,
      "Last Name": this.lastName,
      "Email": this.email,
      "Phone": this.phone,
      "Division": divisionName,
      "District": districtName,
      "Upazila": upazilaName,
      "Union": unionName,
      "Full Address": this.fullAddress,
      "CV": this.cv,
      "Job Title": this.job
     }

      console.log(data);
 
    
    // Assuming you have a toast component, you can use it to display a success message

  },



  },

  template: `
 
  <dialog id="career_apply_modal" class="modal">
  <div
  class="modal-box w-11/12 max-w-2xl p-0 rounded-sm">
  <div class=" border-b  py-3 px-4">
    <h1 class="md:text-h2 text-center text-xl sm:text-2xl font-bold text-primary">Application Form</h1>
  </div>

  <form @submit.prevent="submitForm">
  <div class="p-4 overflow-y-auto">
  <div>
  <input type="text" disabled :value="'Application For ' + job"
  class="peer py-3 px-4 ps-11 block w-full bg-gray-200  rounded-sm text-md cursor-not-allowed"
  >
  </div>
    <div class="sm:flex grid gap-5 items-center w-full my-5">
      <div class="relative sm:w-1/2 w-full">
        <input v-model="firstName" type="text" required
          class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary  focus:ring-primary focus:outline-primary  disabled:opacity-50 disabled:pointer-events-none "
          placeholder="Enter First Name">
        <div
          class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>

      <div class="relative sm:w-1/2 w-full">
        <input v-model="lastName" type="text" required
          class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary  focus:ring-primary focus:outline-primary  disabled:opacity-50 disabled:pointer-events-none "
          placeholder="Enter Last Name">
        <div
          class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>
    </div>
    <div class="sm:flex grid gap-5 items-center w-full my-5">
      <div class="relative sm:w-1/2 w-full">
        <input v-model="email" type="email" required
          class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none "
          placeholder="Enter Email">
        <div
          class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <svg class="fill-gray-500" xmlns="http://www.w3.org/2000/svg" height="1em"
            viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
          </svg>
        </div>
      </div>

      <div class="relative sm:w-1/2 w-full">
        <input v-model="phone" type="tel" required
          class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none "
          placeholder="Enter Phone">
        <div
          class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="flex-shrink-0 w-4 h-4 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="sm:flex grid gap-5">
      <div class="relative  sm:w-1/2 w-full">
          <select required v-model="division" @change="selectedDivision" id="division" class="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none 
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2">
          <option selected>Choose Your Division</option>
            <option v-for="division in divisions" :key="division.id" :value="division.id">{{division.name}}</option>
      
          </select>
          <label for="division" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500">Division</label>
      </div>
      <div class="relative  sm:w-1/2 w-full">
          <select required v-model="district" @change="selectedDistrict" id="district" class="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none 
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2">
          <option selected>Choose Your District</option>
            <option v-for="district in districts" :key="district.id" :value="district.id">{{district.name}}</option>
          </select>
          <label for="district" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500">District</label>
      </div>
    </div>
    
    <div class="sm:flex grid gap-5 my-5">
      <div class="relative  sm:w-1/2 w-full">
          <select required v-model="upazila" @change="selectedUpazila" id="upazila" class="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none 
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2">
          <option selected>Choose Your Upazila</option>
            <option v-for="upazila in upazilas" :key="upazila.id" :value="upazila.id">{{upazila.name}}</option>
          </select>
          <label for="upazila" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500">Upazila</label>
      </div>
      <div class="relative  sm:w-1/2 w-full">
          <select required v-model="union" class="peer p-4 pe-9 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none 
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2">
          <option selected>Choose Your Union</option>
            <option v-for="union in unions" :key="union.id" :value="union.id">{{union.name}}</option>
          </select>
          <label for="union" class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500">Union</label>
      </div>
    </div>



    <div class="relative my-5">
      <div class="relative">
        <input required v-model="fullAddress" type="text"
          class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-sm text-sm focus:border-primary focus:ring-primary focus:outline-primary disabled:opacity-50 disabled:pointer-events-none "
          placeholder="Enter Full Address">
        <div
          class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="flex-shrink-0 w-4 h-4 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>

        </div>
      </div>
    </div>


    <div class="w-full my-5">
      <h1 class="text-xl font-bold mt-5">Upload my Curriculum vitae</h1>
      <p class="my-3">Cv is mandatory.</p>
      <label for="file-input" class="sr-only">Choose file</label>
      <input required @change="handleFileChange" type="file" name="file-input" id="file-input" class="block w-full border bg-gray-100 border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
      file:bg-gray-50 file:border-0
      file:bg-gray-300 file:me-4
      file:py-3 file:px-4
     ">
    </div>

    <div class="flex my-5">
      <input required type="checkbox"
        class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
        id="confirm">
      <label for="confirm" class="text-sm text-gray-500 ms-3">I have read and I accept
        the <a class="underline hover:text-primary" href="./privacy-policy.html">Privacy Policy</a></label>
    </div>
    <div class="flex my-5">
      <input required type="checkbox"
        class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        id="confirm2">
      <label for="confirm2" class="text-sm text-gray-500 ms-3 ">Yes, Roman Water can add
        me to the talent pool and contact me about future job opportunities.</a></label>
    </div>

  </div>
  <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t ">

    <div class="modal-action m-0">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">Close</button>
      </form>
    </div>
    <div>
      <button type="submit"
      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-primary text-white hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none ">
      Submit Application
    </button>
    </div>
  </div>
  </form>
</div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
 
</dialog>
  `
})

  app.mount('#app')