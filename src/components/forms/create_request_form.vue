<template>
    <div class="col-lg-6">
        <!-- Bootstrap Forms Validation -->
        <h2 class="content-heading">Tao yeu cau</h2>
        <div class="block">
            <div class="block-header">
                <ul class="block-options">
                    <li>
                        <button type="button"><i class="si si-settings"></i></button>
                    </li>
                </ul>
                <h3 class="block-title">Validation</h3>
            </div>
            <div class="block-content block-content-narrow">
                <!-- jQuery Validation (.js-validation-bootstrap class is initialized in js/pages/base_forms_validation.js) -->
                <!-- For more examples you can check out https://github.com/jzaefferer/jquery-validation -->
                <div class="js-validation-bootstrap form-horizontal" novalidate="novalidate">
                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-content">Tên công việc<span class="text-danger">*</span></label>
                        <div class="col-md-7">
                            <input class="form-control" v-model="data.subject" type="text" id="val-content" placeholder="Nhap ten cong viec..">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-select2">Mức độ ưu tiên</label>
                        <div class="col-md-7">
                            <select v-model="data.priority" class="js-select2 form-control select2-hidden-accessible" id="val-select2" name="val-select2" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                <option>Chon muc do uu tien</option><!-- Required for data-placeholder attribute to work with Select2 plugin -->
                                <option value="0">Thap</option>
                                <option value="1">Binh thuong</option>
                                <option value="2">Cao</option>
                                <option value="3">Khan Cap</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="example-datetimepicker3">Full options</label>
                        <div class="col-md-6">
                            <div class="js-datetimepicker input-group date" data-show-today-button="true" data-show-clear="true" data-show-close="true">
                                <input class="form-control" type="text" id="example-datetimepicker3" name="example-datetimepicker3" placeholder="Choose a date..">
                                <span class="input-group-addon">
                                                        <span class="fa fa-calendar"></span>
                                                    </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-skill">Bộ phận IT<span class="text-danger">*</span></label>
                        <div class="col-md-7">
                            <select v-model="data.assined_department" class="form-control" id="val-skill" name="val-skill">
                                <option value="">Chon doi IT</option>
                                <option value="IT_HA_NOI">IT Ha Noi</option>
                                <option value="IT_DA_NANG">IT Da Nang</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-select2">Nhân sự liên quan</label>
                        <div class="col-md-7">
                            <select v-model="data.related_employee"  class="js-select2 form-control select2-hidden-accessible" name="val-select2" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                <option>Chọn nhân sự liên quan </option><!-- Required for data-placeholder attribute to work with Select2 plugin -->
                                <option :value="employee.username"  v-for="employee in employees">{{employee.username}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-suggestions">Noi dung <span class="text-danger">*</span></label>
                        <div class="col-md-8">
                            <textarea v-model="data.content" class="form-control" id="val-suggestions" name="val-suggestions" rows="18" placeholder="Noi dung chi tiet cong viec"></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-8 col-md-offset-4">
                            <button class="btn btn-sm btn-primary" @click="submit()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import jquery from 'jquery'
    export default {
        name : 'create-request-form',
        data : function () {
            return {
                data: {
                    subject: null,
                    content: null,
                    priority: null,
                    deathline: null,
                    image: null,
                    assined_department: null,
                    related_employee: null
                }/*,
                employees: [
                    {username: 'Watson'},
                    {username: 'Jeff'},
                    {username: 'Jay'},
                    {username: 'Albert'}
                ]*/
            }
        },
        created: function () {
           this.$store.dispatch('fetchEmployees')
        },
        methods:{
            submit(){
                this.$store.dispatch('sendRequest', this.data)
            }
        },
        computed: {
            employees(){
                return this.$store.getters.employees
            }
        }
    }

</script>