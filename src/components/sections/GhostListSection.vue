<template>
  <div class="ghost-list-section">
    <div class="ghost-filter-section">
      <div class="sort-method-item" @click="activeSortMethod = 'byTime'"
           v-bind:class="{active: activeSortMethod ==='byTime' }">
        <RadioBullet v-bind:isActive="activeSortMethod ==='byTime'"></RadioBullet>
        <div>획득 시간 순서</div>
      </div>
      <div class="sort-method-item" @click="activeSortMethod = 'byGoodness'"
           v-bind:class="{active: activeSortMethod === 'byGoodness' }">
        <RadioBullet v-bind:isActive="activeSortMethod ==='byGoodness'"></RadioBullet>
        <div>선한 점수 순서</div>
      </div>
      <div class="sort-method-item" @click="activeSortMethod ='byEvilness'"
           v-bind:class="{active: activeSortMethod === 'byEvilness' }">
        <RadioBullet v-bind:isActive="activeSortMethod ==='byEvilness'"></RadioBullet>
        <div>악한 점수 순서</div>
      </div>
    </div>
    <GhostTable v-bind:ghosts="ghosts"></GhostTable>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Ghost} from '@/types';
import GhostCard from '@/components/cards/GhostCard.vue';
import RadioBullet from '@/components/bullets/RadioBullet.vue';
import GhostTable from '@/components/tables/GhostTable.vue';

enum MenuType {
  BY_TIME = 'byTime',
  BY_GOODNESS = 'byGoodness',
  BY_EVILNESS = 'byEvilness',
}

@Component({
  components: {GhostCard, RadioBullet, GhostTable},
})
export default class GhostListSection extends Vue {
  @Prop() private ghosts!: Ghost[];
  private activeSortMethod: MenuType;

  constructor() {
    super();
    this.activeSortMethod = MenuType.BY_TIME;
  }
}
</script>

<style scoped lang="scss">
  .ghost-filter-section {
    height: 85px;
    background-color: #eaeaea;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .ghost-list-section {
    background-color: #eaeaea;
  }

  .sort-method-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 12px;
    width: 130px;
    height: 22px;
    font-family: Ubuntu;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.3px;
    color: #9f9f9f;
  }

  .active {
    color: #a05acb;
  }

  .sort-method-item:hover {
    cursor: pointer;
    color: #a05acb;
  }
</style>
