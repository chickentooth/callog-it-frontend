<template>
    <div class="col-lg-6">
        <!-- Bootstrap Forms Validation -->
        <h2 class="content-heading">Tạo yêu cầu</h2>
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
                        <label class="col-md-4 control-label" for="val-content">Tên công việc<span
                                class="text-danger">*</span></label>
                        <div class="col-md-7">
                            <input name="subject" v-validate="{required: true}" class="form-control" v-model="data.subject" type="text" id="val-content"
                                   placeholder="Nhập tên công việc..">
                            <span v-show="errors.has('subject')">{{errors.first('subject')}}</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-select2">Mức độ ưu tiên<span class="text-danger">*</span></label>
                        <div class="col-md-7">
                            <select name="priority" v-validate="{required: true}" v-model="data.priority" class="js-select2 form-control select2-hidden-accessible"
                                    id="val-select2" style="width: 100%;" tabindex="-1"
                                    aria-hidden="true">
                                <option>Chọn mức độ ưu tiên</option>
                                <!-- Required for data-placeholder attribute to work with Select2 plugin -->
                                <option value="0">Thấp</option>
                                <option value="1"> Bình thường</option>
                                <option value="2">Cao</option>
                                <option value="3">Khẩn cấp</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Deadline<span class="text-danger">*</span></label>
                        <div class="col-md-6">
                            <div data-show-today-button="true"
                                 data-show-clear="true" data-show-close="true">
                                <date-picker name="deadline" v-validate="{required: true}" v-model="deadline" :config="config"></date-picker>
                                <span class="input-group-addon">
                                                        <span class="fa fa-calendar"></span>
                                                    </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-skill">Bộ phận IT<span
                                class="text-danger">*</span></label>
                        <div class="col-md-7">
                            <select v-validate="{required:true}" v-model="data.assigned_department" class="form-control" id="val-skill"
                                    name="val-skill">
                                <option value="">Chọn đội IT</option>
                                <option value="IT Ha Noi">Hà Nội</option>
                                <option value="IT Da Nang">Đà Nẵng</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-select2">Nhân sự liên quan</label>
                        <div class="col-md-7">
                            <select v-model="data.related_employee"
                                    class="js-select2 form-control select2-hidden-accessible" name="val-select2"
                                    style="width: 100%;" tabindex="-1" aria-hidden="true">
                                <option>Chọn nhân sự liên quan </option>
                                <!-- Required for data-placeholder attribute to work with Select2 plugin -->
                                <option :value="employee.username" v-for="employee in employees">{{employee.username}}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for="val-suggestions">Nội dung<span
                                class="text-danger">*</span></label>
                        <div class="col-md-8">
                            <textarea v-model="data.content" class="form-control" id="val-suggestions"
                                      name="val-suggestions" rows="18"
                                      placeholder="Nội dung.."></textarea>
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
    import {mapState} from 'vuex'

    export default {
        name: 'create-request-form',
        data: function () {
            return {
                data: {
                    subject: null,
                    content: null,
                    priority: null,
                    image: null,
                    assigned_department: null,
                    related_employee: null
                },
                deadline: '',
                config: {
                    format: 'LLL',
                    useCurrent: false,
                    showClear: true,
                    showClose: true,
                    sideBySide: true,
                    showTodayButton: true
                }
            }
        },
        created: function () {
            this.$store.dispatch('fetchEmployees')
        },
        methods: {
            submit() {
                let unixMilis = moment(this.deadline, 'LLL').format('X')
                this.data.deathline = new Date(unixMilis*1000)
                this.$store.dispatch('sendRequest', this.data).then(
                    () => {
                        if (this.createNewRequest.success) {
                            this.$swal('success', 'Gửi yêu cầu thành công', 'success')
                        } else  {
                            this.$swal('Error', 'Có lỗi xảy ra', 'error')
                        }
                    })
            }
        },
        computed: {
            ...mapState({createNewRequest: state => state.CreateNewRequest}),
            employees() {
                return this.$store.getters.employees
            }
        }
    }

</script>