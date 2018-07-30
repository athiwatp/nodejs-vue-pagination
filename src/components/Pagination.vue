<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">{{title}}</v-card-text>
        </v-card>
      </v-flex>


       <v-flex xs12 sm3 v-for="(video,index) in videos" :key="index">
	      <v-card>
	        <div v-html="video.content"></div>
	        <v-card-title primary-title>
	          <div>
	            <h3 class="headline mb-0 title_name">{{video.title}}</h3>
	          </div>
	        </v-card-title>
	      </v-card>
	    </v-flex>
	    <v-flex sm12>
			 <v-pagination
			      v-model="page"
			      :length="pageShow"
			      @input="next"
			    ></v-pagination>
	    </v-flex>




    </v-layout>
   </v-container>
</template>
<style>
	.title_name{
		font-size: 14px !important;
	}
	iframe{
		width:100%;
	}

</style>
<script>
	export default{
		data:()=>({
			title:"Nodejs Vuejs pagination",
			total:0,
			page:1,
			pageShow:0,
			limit:8,
			videos:{}
		}),
		created(){
			this.get_all_videos();
			this.get_show_page(1);
		},
		methods:{
			get_all_videos(){
				this.axios.get("http://localhost:8888/api/videos").then(response=>{
					//console.log(response.data);
					this.total=response.data.length;
					this.pageShow = Math.round(this.total/this.limit);
					//console.log(this.pageShow);
				})
			},
			get_show_page(page=1){
				this.axios.get("http://localhost:8888/api/videos/"+page).then(response=>{
					//console.log(response.data);
					this.videos=response.data.results;
				});
			},
			next(page){
				//console.log("page:"+page);
				this.get_show_page(page);
			}
		}
	}

</script>