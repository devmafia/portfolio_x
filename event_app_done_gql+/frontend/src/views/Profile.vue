<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-2xl font-semibold mb-6 text-gray-800">User Profile</h3>

    <div class="profile-section mb-6">
      <p class="text-gray-700"><strong>Username:</strong> {{ userData.username }}</p>
      <label class="block text-sm font-medium text-gray-700 mt-4">Edit Username:</label>
      <input
        class="field border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-200 focus:border-blue-500"
        name="username"
        type="text"
        v-model="username"
        placeholder="New username"
      />
      <button
        @click="handleEditUsername"
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Edit username
      </button>
    </div>

    <div class="profile-section mb-6">
      <p class="text-gray-700"><strong>Email:</strong> {{ userData.email }}</p>
      <label class="block text-sm font-medium text-gray-700 mt-4">Edit Email:</label>
      <input
        class="field border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-200 focus:border-blue-500"
        name="email"
        type="text"
        v-model="email"
        placeholder="New email"
      />
      <button
        @click="handleEditEmail"
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Edit email
      </button>
    </div>

    <div class="profile-section mb-6">
      <label class="block text-sm font-medium text-gray-700">Edit Password:</label>
      <input
        class="field border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-200 focus:border-blue-500 mb-2"
        name="password"
        type="password"
        v-model="password"
        placeholder="New password"
      />
      <input
        class="field border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-200 focus:border-blue-500 mb-4"
        name="confirm_password"
        type="password"
        v-model="confirm_password"
        placeholder="Confirm password"
      />
      <button
        @click="handleEditPassword"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Edit password
      </button>
    </div>

    <button
      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 mb-6"
      @click="handleDeleteUser"
    >
      Delete user
    </button>

    <div class="bookings-section">
      <h3 class="text-xl font-semibold mb-4 text-gray-800">Your Bookings</h3>
      <div class="bookings-list">
        <div v-if="userBookings.length === 0" class="no-bookings mb-4">
          <p class="text-gray-600">You have no bookings yet.</p>
        </div>
        <div
          v-for="booking in userBookings"
          :key="booking.id"
          class="booking-card bg-gray-50 p-4 rounded-lg shadow mb-4"
        >
          <h4 class="text-lg font-semibold">Booking ID: {{ booking.id }}</h4>
          <p class="text-gray-700"><strong>Guest Name:</strong> {{ booking.guestName }}</p>
          <p class="text-gray-700"><strong>Email:</strong> {{ booking.guestEmail }}</p>
          <p class="text-gray-700"><strong>Phone:</strong> {{ booking.phone }}</p>
          <p class="text-gray-700"><strong>Total Price:</strong> ${{ booking.totalPrice }}</p>
          <p class="text-gray-700"><strong>Created At:</strong> {{ new Date(booking.createdAt).toLocaleString() }}</p>

          <h5 class="mt-4 text-sm font-medium text-gray-700">Events:</h5>
          <ul>
            <li
              v-for="event in booking.events"
              :key="event.id"
              class="event-item flex items-center justify-between p-2 border-b border-gray-200"
            >
              <div class="flex items-center">
                <img :src="event.image" alt="Event image" class="event-image w-16 h-16 object-cover rounded-md mr-2" />
                <div>
                  <strong>{{ event.title }}</strong> ({{ new Date(event.date).toLocaleDateString() }})
                  <p class="text-gray-600">{{ event.description }}</p>
                  <p class="text-gray-700"><strong>Price:</strong> ${{ event.price }}</p>
                  <strong>Seats:</strong>
                  <ul>
                    <li
                      v-for="seat in booking.seats.filter(seat => seat.eventId === event.id)"
                      :key="seat.id"
                      class="text-gray-600"
                    >
                      Seat Number: {{ seat.seatNumber }}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <button
            @click="handleDeleteBooking(booking.id)"
            class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Delete booking
          </button>
        </div>
      </div>
    </div>

    <div v-if="messages.length !== 0" class="mt-6">
      <ul class="space-y-2">
        <li v-for="(message, index) in messages" :key="index" class="text-gray-600">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_USER_DATA, FETCH_USER_BOOKINGS, UPDATE_USERNAME, UPDATE_EMAIL, UPDATE_PASSWORD, DELETE_USER, DELETE_BOOKING } from '../graphql/profileQueries';

const username = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const userData = ref({});
const userBookings = ref([]);
const messages = ref([]);

const { data: userDataResponse, loading: loadingUserData, error: errorUserData } = useQuery(FETCH_USER_DATA);
const { data: bookingsData, loading: loadingBookings, error: errorBookings } = useQuery(FETCH_USER_BOOKINGS);

const [updateUsername] = useMutation(UPDATE_USERNAME);
const [updateEmail] = useMutation(UPDATE_EMAIL);
const [updatePassword] = useMutation(UPDATE_PASSWORD);
const [deleteUser] = useMutation(DELETE_USER);
const [deleteBooking] = useMutation(DELETE_BOOKING);

onMounted(() => {
  if (userDataResponse) {
      userData.value = userDataResponse.user;
  }

  if (bookingsData) {
      userBookings.value = bookingsData.bookings;
  }
});

const handleEditUsername = async () => {
  try {
      const { data } = await updateUsername({
          variables: { id: userData.value.id, username: username.value }
      });
      userData.value.username = data.updateUsername.username;
  } catch (error) {
      console.error('Update username error:', error);
  }
};

const handleEditEmail = async () => {
  try {
      const { data } = await updateEmail({
          variables: { id: userData.value.id, email: email.value }
      });
      userData.value.email = data.updateEmail.email;
  } catch (error) {
      console.error('Update email error:', error);
  }
};

const handleEditPassword = async () => {
  if (password.value !== confirm_password.value) {
      alert("Passwords do not match");
      return;
  }

  try {
      const { data } = await updatePassword({
          variables: { id: userData.value.id, password: password.value }
      });
      alert("Password updated successfully");
  } catch (error) {
      console.error('Update password error:', error);
  }
};

const handleDeleteUser = async () => {
  try {
      await deleteUser({
          variables: { id: userData.value.id }
      });
      router.push('/events');
  } catch (error) {
      console.error('Delete user error:', error);
  }
};

const handleDeleteBooking = async (bookingId) => {
  try {
      await deleteBooking({
          variables: { id: bookingId }
      });
      userBookings.value = userBookings.value.filter(b => b.id !== bookingId);
  } catch (error) {
      console.error('Delete booking error:', error);
  }
};
</script>

<style scoped>
.field {
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
}
.event-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
</style>
