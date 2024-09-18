<template>
  <v-container>
    <v-row class="header">
      <div class="d-flex align-center">
        <span class="title">Vechicles</span>
        <span class="badge">256</span>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <span class="header-btn-add">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V5C11 4.44772 11.4477 4 12 4Z" fill="#E86E84"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="#E86E84"/>
          </svg>
        </span>
        <v-avatar size="46px" class="background-avatar">
          <!-- <v-img v-if="img" class="user-avatar" src="#"></v-img> -->
          <v-img class="user-avatar" src="../../public/user-logo.svg"></v-img>
        </v-avatar>
        <span class="user-name">User name</span>
        <v-img class="uk" src="../../public/uk.svg"></v-img>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="custom-btn" text>
              En
              <v-icon right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in itemDropdownMenu"
                  :key="i"
                >
                  <div class="d-flex">
                    <v-icon class="mr-2">{{ item.icon }}</v-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </div>
                </v-list-item>
              </v-list>
        </v-menu>
      </div>
    </v-row>

    <v-row>
        <v-text-field
          v-model="search"
          label="Seasch VIN"
          append-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
          density="compact"
          class="search"

        />
        <div class="d-flex align-center">
          <span class="text-per-page">Select vehicles per page: </span>
          <v-menu transition="slide-y-transition" offset-y>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="text" class="btn-per-page">
                {{ selectedItemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="option in itemsPerPageOptions"
                :key="option"
                @click="selectItemsPerPage(option)"
              >
                <v-list-item-title>{{ option }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" class="btn-add-vechicle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V5C11 4.44772 11.4477 4 12 4Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="white"/>
          </svg>
          <span class="text-add-vechicle">ADD VECHICLE</span>
        </v-btn>
    </v-row>

    <v-row justify="start" class="mt-8" >
      <v-col
        v-for="car in paginatedCars"
        :key="car.id"
        cols="auto"
        class="d-flex justify-center"
      >
        <v-card
          class="my-card"
          elevation="0"
        >
          <div class="d-flex justify-end mr-1 mt-1">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" class="custom-btn-car">
                  <v-icon style="color: rgba(41, 49, 72, 0.6);">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
                    <v-list>
                      <v-list-item
                        v-for="(item, i) in cardDropdownMenu"
                        :key="i"
                      >
                        <div class="d-flex">
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </div>
                      </v-list-item>
                    </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-center">
            <v-img
              :src="car.photo?.url || '../../public/47844.svg'"
              alt="Описание изображения"
              class="image"
            ></v-img>
          </div>
          <v-card-text class="car-name">{{ car.vehicle_name || 'Не названа'}}</v-card-text>
          <v-card-text class="car-vin">WDB {{ car.vin }}</v-card-text>
          <div class="d-flex justify-space-between">
            <span class="badge-done">{{ car.angles_count }}/30</span>
            <span class="day-left">{{ getDaysLeft(car.created_at) }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-pagination
        v-model:page="currentPage"
        :length="totalPageCount"
      />
    </v-row>
  </v-container>
</template>




<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchCars } from '../services/api.js';

const search = ref('');
const cars = ref([]);
const currentPage = ref(1);
const selectedItemsPerPage = ref(10);
const itemsPerPageOptions = [5, 10, 20, 50, 100];
const totalPageCount = ref(1);

const itemDropdownMenu = ref([
  { icon: 'mdi-flag-variant-outline', title: 'Русский' },
  { icon: 'mdi-flag-variant-outline', title: 'English' },
  { icon: 'mdi-flag-variant-outline', title: 'Français' },
  { icon: 'mdi-flag-variant-outline', title: 'Español' },
])

const cardDropdownMenu = ref([
  {  title: 'item 1' },
  {  title: 'item 2' },
  {  title: 'item 3' },
  {  title: 'item 4' },
]);

function getDaysLeft(timestamp) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp * 1000);
  const diffInMilliseconds = targetDate - currentDate;
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil(diffInMilliseconds / millisecondsInADay);

  if (daysLeft > 0) {
    return `${daysLeft} days left`;
  } else if (daysLeft < 0) {
    return ` ${-daysLeft} days ago`;
  } else {
    return "Today";
  }
}

const getCars = async () => {
  try {
    const response = await fetchCars(currentPage.value, selectedItemsPerPage.value);
    if (response && response.data && Array.isArray(response.data)) {
      cars.value = response.data;
      totalPageCount.value = response.meta.last_page;
    } else {
      cars.value = [];
    }
  } catch (error) {    console.error('Error fetching cars:', error);
    cars.value = [];
  }
};

const selectItemsPerPage = (option) => {
  selectedItemsPerPage.value = option;
  currentPage.value = 1;
  getCars();
};

const paginatedCars = computed(() => {
  const start = (currentPage.value - 1) * selectedItemsPerPage.value;
  const end = start + selectedItemsPerPage.value;
  return filteredCars.value.slice(start, end);
});

const onPageChange = async (page) => {
  currentPage.value = page;
  await getCars();
};

const filteredCars = computed(() => {
  return cars.value.filter(car =>
    car.vin.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(() => {
  getCars();
});

</script>


<style lang="sass" scoped>
.header
  margin: 14px 0 36px 0
  padding-bottom: 30px
  border-bottom: 1px solid #E4E4E4

.title
  font-size: 32px
  font-weight: 700
  line-height: 38px
  margin-left: 10px
  color: #293148

.badge
  padding: 4px 14px
  border-radius: 6px
  background-color: #F3F6F8
  margin-left: 20px
  color: rgba(41, 49, 72, 0.8)

.header-btn-add
  display: inline-flex
  justify-content: center
  align-items: center
  height: 42px
  width: 42px
  border-radius: 6px
  border: 1px solid #E86E84
  margin-right: 40px

.background-avatar
  background-color: #F3F6F8
  display: flex
  align-items: flex-end
  justify-content: center
  margin-right: 10px

.user-avatar
  width: auto
  height: auto
  max-width: 32px
  max-height: 32px
  object-fit: contain

.user-name
  font-size: 15px
  font-weight: 500
  line-height: 22px
  color: #293148
  margin-right: 40px

.uk
  width: 24px
  height: 24px

.custom-btn
  box-shadow: none
  border: none
  min-width: auto
  color: #293148

.custom-btn:focus
  box-shadow: none

.custom-btn:hover
  box-shadow: none

.search
  max-width: 354px
  margin-right: 30px
  padding: 10px 16px

.text-per-page
  font-size: 16px
  font-weight: 400
  line-height: 22px
  color: #293148
  margin-right: 10px

.btn-per-page
  height: 42px
  width: 85px
  border-radius: 8px
  border: 1px solid #e4e4e4

.btn-add-vechicle
  width: 180px
  height: 42px
  border-radius: 8px
  background-color: #d90e32
  border: none
  color: #fff
  margin-right: 16px
  align-self: center
  
.text-add-vechicle
  margin-left: 10px
  font-size: 12px
  font-weight: 700
  line-height: 20px

.my-card
  width: 354px
  height: 335px
  border-radius: 10px
  background-color: #F3F6F8

.image
  width: 260px
  height: 135px
  object-fit: cover


.custom-btn-car
  box-shadow: none
  border: none
  min-width: auto
  color: #293148
  background-color: #F3F6F8

.custom-btn:focus
  box-shadow: none

.custom-btn:hover
  box-shadow: none  

.car-name
  font-size: 20px
  font-weight: 700
  line-height: 22px 
  color: #293148
  padding: 16px 20px 6px 20px

.car-vin
  font-size: 15px
  font-weight: 500
  line-height: 20px 
  color: rgba(41, 49, 72, 0.6)
  padding: 0 0 14px 0
  margin: 0 20px
  border-bottom: 1px solid #E4E4E4

.badge-done
  padding: 4px 14px
  border-radius: 6px
  background-color: #ededed
  margin: 15px 20px
  color: rgba(41, 49, 72, 0.8)
  font-size: 15px
  font-weight: 700
  line-height: 22px 

.day-left
  font-size: 15px
  font-weight: 500
  line-height: 16px 
  color: rgba(41, 49, 72, 0.6)
  margin-right: 20px
  align-self: center
</style>
