<template>
  <li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow">
    <div class="flex-1 flex flex-col p-8">
      <img
        class="w-32 h-32 text-gray-200 flex-shrink-0 mx-auto bg-gray-200 rounded-full"
        width="128"
        height="128"
        :src="image"
        :alt="`Picture of ${plant.scientificname}`"
        loading="lazy"
      />
      <h2 class="mt-6 text-gray-900 text leading-5 font-medium">
        {{ plant.name }}
      </h2>
      <dl class="mt-1 flex-grow flex flex-col justify-between">
        <dt class="sr-only">Scientific Name</dt>
        <dd class="text-gray-500 text-sm italic leading-5">
          {{ plant.scientificname }}
        </dd>
        <dt class="sr-only">Sun</dt>
        <dd class="flex mt-3 justify-center items-center">
          <svg
            class="flex-none w-4 h-4 mr-2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span
            class="px-2 py-1 text-xs leading-4 font-medium rounded-full"
            :class="sunClass"
          >
            {{ plant.sun }}
          </span>
        </dd>

        <template v-if="hasWater">
          <dt class="sr-only">Water</dt>
          <dd class="flex mt-3 justify-center items-center">
            <svg
              class="flex-none w-4 h-4 mr-2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
              />
            </svg>
            <span
              class="px-2 py-1 text-xs leading-4 font-medium rounded-full"
              :class="waterClass"
            >
              {{ plant.water }}
            </span>
          </dd>
        </template>

        <template v-if="hasHumidity">
          <dt class="sr-only">Humidity</dt>
          <dd class="flex mt-3 justify-center items-center">
            <svg
              class="flex-none w-4 h-4 mr-2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <span
              class="px-2 py-1 text-xs leading-4 font-medium rounded-full bg-yellow-800 text-white bg-or"
            >
              {{ plant.humidity }}
            </span>
          </dd>
        </template>

        <template v-if="hasCare">
          <dt class="sr-only">Care</dt>
          <dd class="flex mt-3 justify-center items-center">
            <svg
              class="flex-none w-4 h-4 mr-2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              class="px-2 py-1 text-xs leading-4 font-medium rounded-full text-green-800 bg-green-200"
            >
              {{ plant.care }}
            </span>
          </dd>
        </template>

        <dt class="sr-only">Joined</dt>
        <dd class="flex mt-3 justify-center items-center">
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span
            class="px-2 py-1 text-xs leading-4 font-medium rounded-full text-teal-800 bg-teal-100"
          >
            Joined {{ joinedAt }}
          </span>
        </dd>
      </dl>
    </div>
  </li>
</template>

<script>
import { formatDistanceToNow } from "date-fns";

const defaultImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24' stroke='%23cbd5e0'%3E%3Cpath d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'%3E%3C/path%3E%3C/svg%3E";

const SUN_MAP = {
  "Partial Shade": "bg-yellow-400",
  "Indirect Sunlight": "bg-yellow-200",
  Sun: "bg-orange-400"
};

const WATER_MAP = {
  "1x / week": "bg-blue-200",
  "2x / week": "bg-blue-300",
  "1x / 2 weeks": "bg-blue-100"
};

export default {
  props: {
    plant: {
      type: Object,
      requires: true
    }
  },
  computed: {
    hasCare() {
      return this.plant.care?.trim().length > 0;
    },
    hasWater() {
      return this.plant.water?.trim().length > 0;
    },
    hasHumidity() {
      return this.plant.humidity?.trim().length > 0;
    },
    sunClass() {
      return SUN_MAP[this.plant.sun] ?? "text-teal-800 bg-teal-100";
    },
    waterClass() {
      return WATER_MAP[this.plant.water] ?? "text-teal-800 bg-teal-100";
    },
    image() {
      return this.plant.image?.length > 0 ? this.plant.image : defaultImage;
    },
    joinedAt() {
      return formatDistanceToNow(new Date(this.plant.joinedat), {
        addSuffix: true
      });
    }
  }
};
</script>
