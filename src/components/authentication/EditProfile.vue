<template>
    <Navbar v-if="!isSeller"></Navbar>
    <Navbar2 v-else></Navbar2>
    <!-- start code here -->
    <main class="mt-1 pt-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 fw-bold fs-3">Edit profile</div>
            </div>
            <div class="row my-2">
            <div class="col-8">
                <b :class="{'text-success': displayMessage}" style="white-space: pre-line; font-size: large;">{{ updateMessage}}</b>
            </div>
             </div>
            <div class="row">
                <div class="image-container">
                    <img :src="getImageSource()" alt="" class="profile-image">
                    <i class="bi bi-pencil-fill edit-icon" @click="triggerFileInput"></i>
                    <input class="form-control" type="file" id="formFile" ref="fileInput" @change="onFileSelected" accept="image/*" hidden>
                </div>
            </div>
            <div class="row">
                <div class="col-5 col-sm-4">
                    <label for="fullname" class="form-label">Full name *</label>
                    <input type="text" class="form-control" id="fullname"  placeholder="Enter full name" v-model="fullname">
                </div>
                <div class="col-5 col-sm-4">
                    <label for="birthday" class="form-label">Date of Birth *</label>
                    <input type="date" class="form-control" :class="{'error-sign': isDobError}" id="birthday" name="birthday" :max="maxBirthday" @input="validateDob" v-model="dob">
                </div>
            </div>
            <div class="row mt-2">
                
                <div class="col-2">
                    <label for="gender" class="form-label">Gender *</label>
                </div>
                <div class="form-check col-3">
                    <input class="form-check-input" type="radio" name="gender" id="male-gender" value="true" v-model="gender">
                    <label class="form-check-label" for="male-gender">Male </label>
                </div>
                <div class="form-check col-3">
                    <input class="form-check-input" type="radio" name="gender" id="female-gender" value="false" v-model="gender">
                    <label class="form-check-label" for="female-gender">Female</label>
                </div>
            </div>
            <div class="row my-2">
            <div class="col-sm-6 col-md-8 text-center">
                <button class="btn" v-on:click="updateProfile">Update</button>
            </div>
        </div>
        </div>
    </main>
</template>

<script>
import Navbar from '@/components/admin/sidenav.vue';
import Navbar2 from '@/components/seller/sellernav.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ApiConstant } from "../../repository/APIConstant.js"
import axios from 'axios';
import defaultProfileImage from '@/assets/profileimage.png';

export default{
    name: "EditProfile",
    components:{
        Navbar,
        Navbar2,
    },
    async mounted(){
        let user = localStorage.getItem('token');
        let seller = localStorage.getItem('isSeller');
        this.token = user.substring(1, user.length -1);
        if (!user){
            console.log("got rejected in Home");
            localStorage.removeItem('token');
            localStorage.removeItem('isSeller');
            this.$router.push({name: 'Login'});
        }
        if (seller == "yes"){
            this.isSeller = true;
        } 
        await this.getUserInfo();
    },
    data(){
        return {
            token: '',
            isSeller: false,
            dob: '',
            fullname: '',
            gender: '',
            user: null,
            profileimg64 : '',
            selectedImage: null,
            updateMessage: '',
            displayMessage: true,
        }
    },
    methods:{
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        onFileSelected(event) {
            this.selectedImage = event.target.files[0];

            if (this.selectedImage && this.selectedImage.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                // `reader.result` contains the base64 string
                const base64Url = reader.result;
                // Do something with the base64 string, such as assigning it to a variable
                const [, base64String] = base64Url.split(',');
                this.profileimg64 = base64String;
                };
                reader.readAsDataURL(this.selectedImage);
            } 
            else {
                // Display an error message or take appropriate action
                console.log('Invalid file type. Please select an image.');
            }
        },
        async updateProfile(){
            this.displayMessage = true;
            this.updateMessage = "Loading...";
            if (!this.fullname || !this.dob || this.gender == null){
                this.updateMessage = "Please fill up all the form";
                this.displayMessage = false;
                return;
            }
            console.log(this.profileimg64);
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (this.profileimg64 != ""){
                this.profileimg64 = this.profileimg64.split(',')[1];
            }
            var body = {
                fullName : this.fullname,
                dateOfBirth: this.dob,
                gender: JSON.parse(this.gender),
                profileImage : this.profileimg64,
                address: "x",
                latitude: 0,
                longitude: 0,
            };
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };
            var url = ApiConstant.UpdateProfileURL;
            await axios.put(
                url, body ,
                {headers: header}
            ).then( 
                res => { 
                    if (res.status == 200) { 
                        this.updateMessage = '';
                        this.displayMessage = false;
                        this.$router.go();
                    } else{
                        this.updateMessage = res.status;
                        this.displayMessage = true;
                    }
             }
            ).catch( 
                error => { 
                    console.log(error.response);
                    this.updateMessage = 'Error when updating';
                        this.displayMessage = true;
                }
            );
        },
        validateDob(){
            const enteredDate = new Date(this.dob);

            if(enteredDate > new Date(this.maxBirthday)){
                enteredDate.setFullYear(new Date(this.maxBirthday).getFullYear());
                this.dob = enteredDate.toISOString().split('T')[0];
            }
        },
        getImageSource() {
            if (this.profileimg64 && this.profileimg64 !== "") {
                // decode the string
                // create blob

                if (!this.profileimg64.startsWith('data:image/png;base64,')) {
                    this.profileimg64 = 'data:image/png;base64,' + this.profileimg64;
                }                
                const blob = this.dataURLtoBlob(this.profileimg64);
                                // create data url from blob
                const dataUrl = URL.createObjectURL(blob);
                return dataUrl;
            } else {
                return defaultProfileImage;
            }
        },
        dataURLtoBlob(dataURL) {
            // Convert base64 to raw binary data held in a string
            const byteString = atob(dataURL.split(',')[1]);

            // Separate the MIME component
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

            // Write the bytes of the string to an ArrayBuffer
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // Create a Blob from the ArrayBuffer
            return new Blob([ab], { type: mimeString });
        },
        async getUserInfo(){
            var header = {
                "Content-Type": "application/json",
                "Authorization": "bearer " + this.token,
            };
            var url = ApiConstant.GetProfileURL;
            axios.get(
                url, {headers: header}
            ).then(
                res => {
                    this.user = res.data;
                    this.fullname = this.user.fullName;
                    this.dob = this.user.dateOfBirth.split('T')[0];
                    this.gender = this.user.gender;
                    this.profileimg64 = this.user.profileImage;
                }
            ).catch(
                error => {
                    console.log(error.response);
                }
            );
        }
    },
    computed: {
        maxBirthday(){
            const currentDate = new Date();
            const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
            const formattedMaxDate = maxDate.toISOString().split('T')[0];
            return formattedMaxDate;
        }
    },

}
</script>

<style scoped>
main{
    margin-left: 10px;
    padding-left: 10px;
}
img{
    border: 1.5px solid black;
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: 0 auto;
}
.image-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 20px 20px;
  border: 1px solid black;
}

.profile-image {
  width: 100%;
  height: 100%;
}

.edit-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;  /* Change the color as needed */
  background: rgba(0, 0, 0, 0.8);  /* Change the background as needed */
  padding: 8px;
  cursor: pointer;
}

button{
    width: 200px;
    color: var(--dark-color);
    background-color: var(--light-color);
    border: 1px solid var(--dark-color);
}
button:hover{
    border: 1px solid var(--dark-color);
    color: #FFF;
    background-color: var(--gold-neutral-color);
}
input[type='radio']:after {
    width: 17px;
    height: 17px;
    border-radius: 15px;
    top: -3px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

input[type='radio']:checked:after {
    width: 17px;
    height: 17px;
    border-radius: 15px;
    top: -3px;
    left: -1px;
    position: relative;
    background-color: var(--gold-neutral-color);
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

@media (min-width: 992px){
    
    main{
        margin-left: 250px;
    }
  
}
</style>