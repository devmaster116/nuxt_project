
export const state = () => ({
    subTasks: [],
    selectedSubTask: {},
  });
  
  export const getters = {
    getSubTasks(state) {
      return state.subTasks;
    },
  
    getSelectedSubTask(state) {
      return state.selectedSubTask;
    },
  };
  
  export const mutations = {
  
    fetchSubTasks(state, payload) {
      state.subTasks = payload
    },
  
    createSubTask(state, payload) {
      state.subTasks.push(payload);
    },
  
    setSingleSubTask(state, currentTask) {
      state.selectedSubTask = currentTask;
    },
  };
  
  export const actions = {
    // fetch all SubTasks
    async fetchTasks(ctx, payload) {
      const res = await this.$axios.$get('/subtask/task/' + payload.id, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      if (res.statusCode == 200) {
        ctx.commit('fetchSubTasks', res.data);
      }
    },
  
    // set single SubTask
    setSingleSubTask(ctx, payload) {
      ctx.commit('setSingleSubTask', payload)
    },
  
    // create Task
    async createTask(ctx, payload) {
      const res = await this.$axios.$post('/subtask', payload, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
      // console.log("create task response =>", res)
  
      if (res.statusCode == 200) {
        ctx.commit('createSubTask', res.data);
      }
      return res.data
    },
    
  };
  