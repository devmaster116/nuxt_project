
export const state = () => ({
    goals: [],
    selectedGoal: {},
    favGoals: []
  });
  
  export const getters = {
    getGoals(state) {
      return state.goals;
    },
  
    getSelectedGoal(state) {
      return state.selectedGoal;
    },

    getFavGoals(state) {
      let fav = []
      state.favGoals.map(f => {
        fav.push({ label: f.goals.title, icon: "folder-solid", id: f.goals.id })
      })
      return fav
    },
  };
  
  export const mutations = {
  
    fetchGoals(state, payload) {
      state.goals = payload
    },
  
    createGoal(state, payload) {
      state.goals.push(payload);
    },
  
    setSingleGoal(state, currentGoal) {
      state.selectedGoal = currentGoal;
    },

    setFavGoals(state, payload) {
      state.favGoals = payload
    },

    sortGoals(state, payload) {
    
      // sort By Project Name
      if (payload.key == 'name' && payload.order == 'asc') {
        let arr = JSON.parse(JSON.stringify(state.goals));
        arr.sort((a, b) => a.title.localeCompare(b.title));
        state.goals = arr;
      }

      if (payload.key == 'name' && payload.order == 'desc') {
        let arr = JSON.parse(JSON.stringify(state.goals));
        arr.sort((a, b) => b.title.localeCompare(a.title));
        state.goals = arr;
      }

      // Sort By Project Owner Name
      if (payload.key == 'owner' && payload.order == 'asc') {
        let arr = JSON.parse(JSON.stringify(state.goals))
        arr.sort((a, b) => a.user.firstName.localeCompare(b.user.firstName));
        state.goals = arr;
      }

      if (payload.key == 'owner' && payload.order == 'desc') {
        let arr = JSON.parse(JSON.stringify(state.goals))
        arr.sort((a, b) => b.user.firstName.localeCompare(a.user.firstName));
        state.goals = arr;
      }


      // Sort By Status
      if (payload.key == 'status' && payload.order == 'asc') {

        let arr = JSON.parse(JSON.stringify(state.goals))
        let newArr = []

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].statusId) {
            newArr.unshift(arr[i])
          } else {
            newArr.push(arr[i])
          }
        }

        newArr.sort((a, b) => {
          if (a.status && b.status) {
            return a.status.text.localeCompare(b.status.text)
          }
        });
        state.goals = newArr;

      }

      if (payload.key == 'status' && payload.order == 'desc') {

        let arr = JSON.parse(JSON.stringify(state.goals))
        let newArr = []

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].statusId) {
            newArr.unshift(arr[i])
          } else {
            newArr.push(arr[i])
          }
        }

        newArr.sort((a, b) => {
          if (a.status && b.status) {
            return b.status.text.localeCompare(a.status.text)
          }
        });
        state.goals = newArr;

      }

      // Sort By Department
      if (payload.key == 'department' && payload.order == 'asc') {

        let arr = JSON.parse(JSON.stringify(state.goals))
        arr.sort((a, b) => new Date(a.department) - new Date(b.department));
        state.goals = arr;

      }

      if (payload.key == 'department' && payload.order == 'desc') {

        let arr = JSON.parse(JSON.stringify(state.goals))
        arr.sort((a, b) => new Date(b.department) - new Date(a.department));
        state.goals = arr;

      }

      // Sort By Due Date
      if (payload.key == 'dueDate' && payload.order == 'asc') {

        let arr = JSON.parse(JSON.stringify(state.goals))
        let newArr = []

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].dueDate) {
            newArr.unshift(arr[i])
          } else {
            newArr.push(arr[i])
          }
        }

        newArr.sort((a, b) => {
          if (a.dueDate && b.dueDate) {
            new Date(a.dueDate) - new Date(b.dueDate)
          }
        });
        state.goals = newArr;
      }

      if (payload.key == 'dueDate' && payload.order == 'desc') {

        let arr = JSON.parse(JSON.stringify(state.goals))
        let newArr = []

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].dueDate) {
            newArr.unshift(arr[i])
          } else {
            newArr.push(arr[i])
          }
        }

        newArr.sort((a, b) => {
          if (a.dueDate && b.dueDate) {
            new Date(b.dueDate) - new Date(a.dueDate)
          }
        });
        state.goals = newArr;
      }

      // Sort By Priority
      if (payload.key == 'priority' && payload.order == 'asc') {
        let arr = JSON.parse(JSON.stringify(state.goals))
        let newArr = []

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].priorityId) {
            newArr.unshift(arr[i])
          } else {
            newArr.push(arr[i])
          }
        }

        newArr.sort((a, b) => {
          if (a.priority && b.priority) {
            return a.priority.text.localeCompare(b.priority.text)
          }
        });
        state.goals = newArr;
      }

      if (payload.key == 'priority' && payload.order == 'desc') {
        let arr = JSON.parse(JSON.stringify(state.goals))
        let newArr = []

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].priorityId) {
            newArr.unshift(arr[i])
          } else {
            newArr.push(arr[i])
          }
        }

        newArr.sort((a, b) => {
          if (a.priority && b.priority) {
            return b.priority.text.localeCompare(a.priority.text)
          }
        });
        state.goals = newArr;
      }

    }
  };
  
  export const actions = {
    // fetch all Goals
    async fetchGoals(ctx, payload) {
      const res = await this.$axios.$get(`/goal/company/${JSON.parse(localStorage.getItem('user')).subb}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, filter: payload ? payload : 'all' }
      });
      
      if (res.statusCode == 200) {
        ctx.commit('fetchGoals', res.data);
      }
    },
  
    // set single Goal
    setSingleGoal(ctx, payload) {
      ctx.commit('setSingleGoal', payload)
    },
  
    // create Goal
    async createGoal(ctx, payload) {
      const res = await this.$axios.$post('/goal', payload, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
  
      if (res.statusCode == 200) {
        ctx.commit('createGoal', res.data);
      }
      return res.data
    },

    sortGoals(ctx, payload) {
      ctx.commit('sortGoals', payload)
    },

    async setFavGoals(ctx) {
      
      try {

        const fav = await this.$axios.$get("/goal/user/favorites", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
          }
        })

        if (fav.statusCode == 200) {
          ctx.commit("setFavGoals", fav.data)
        } else {
          ctx.commit("setFavGoals", [])
        }
      } catch (e) {
        console.log(e);
      }
    },

    async addToFavorite(ctx, payload) {
    
      try {
  
        let fav = await this.$axios.post(`/goal/${payload.id}/favorite`, {}, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
          }
        })
  
        if(fav.data.statusCode == 200) {
          ctx.dispatch("setFavGoals")
          return fav.data.message
        } else {
          return fav.data.message
        }
  
      } catch(e) {
        console.log(e);
      }
    },
  
    async removeFromFavorite(ctx, payload) {
      
      try {
  
        let fav = await this.$axios.delete(`/goal/${payload.id}/favorite`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
          }
        })
  
        if(fav.data.statusCode == 200) {
          ctx.dispatch("setFavGoals")
          return fav.data.message
        } else {
          return fav.data.message
        }
  
      } catch(e) {
        console.log(e);
      }
    }
    
  };
  