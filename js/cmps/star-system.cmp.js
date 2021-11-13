export default {
    template: `
    <div class="star-system">
        <label>
          <input @click="rate('rated', 1)" type="radio" name="stars" value="2" />
          <span class="icon">★</span>
        </label>
        <label >
          <input @click="rate('rated', 2)" type="radio" name="stars" value="2" />
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
        <label>
          <input @click="rate('rated', 3)" type="radio" name="stars" value="3" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>   
        </label>
        <label>
          <input @click="rate('rated', 4)" type="radio" name="stars" value="4" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
        <label>
          <input @click="rate('rated', 5)" type="radio" name="stars" value="5" />
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
          <span class="icon">★</span>
        </label>
    </div>
    `,
    methods: {
        rate(event, value) {
            this.$emit(event, value)
        }
    }
}