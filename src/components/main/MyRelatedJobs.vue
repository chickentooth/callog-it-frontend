<template>
    <div class="block">
        <div class="block-header">
            <h3 class="block-title">Tất cả YÊU CẦU CỦA TÔI</h3>
        </div>
        <div class="block-content">
            <!-- DataTables init on table by adding .js-dataTable-simple class, functionality initialized in js/pages/base_tables_datatables.js -->
            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                <div class="row">
                    <div class="col-sm-12">
                        <table class="table table-bordered table-striped js-dataTable-simple dataTable no-footer"
                               id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                            <thead>
                            <tr role="row">
                                <th class="text-center sorting_asc" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1" aria-sort="ascending"
                                    aria-label=": activate to sort column descending" style="width: 48px;"></th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                    colspan="1" aria-label="Name: activate to sort column ascending"
                                    style="width: 245px;">Tên
                                </th>
                                <th class="hidden-xs sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending"
                                    style="width: 352px;">Mức độ ưu tiên
                                </th>
                                <th class="hidden-xs sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending"
                                    style="width: 352px;">người yêu cầu
                                </th>
                                <th class="hidden-xs sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                    rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending"
                                    style="width: 352px;">người thực hiện
                                </th>
                                <th class="hidden-xs sorting" style="width: 113px;" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                                    aria-label="Access: activate to sort column ascending">Thời gian hết hạn
                                </th>
                                <th class="hidden-xs sorting" style="width: 113px;" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
                                    aria-label="Access: activate to sort column ascending">Trạng thái
                                </th>
                                <th class="text-center sorting_disabled" style="width: 62px;" rowspan="1" colspan="1"
                                    aria-label="Actions">Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr v-for="(job, index) in jobs" role="row" class="odd">
                                <td class="text-center sorting_1">{{index}}</td>
                                <td class="font-w600">{{job.subject}}</td>
                                <td class="hidden-xs">{{getPriority(job)}}</td>
                                <td class="hidden-xs">{{job.created_by}}</td>
                                <td class="hidden-xs">{{job.assigned_to}}</td>
                                <td class="hidden-xs">{{getTime(job)}}</td>
                                <td class="hidden-xs">
                                    <span class="label label-success">{{getStatus(job)}}</span>
                                </td>
                                <td class="text-center">
                                    <div class="btn-group">
                                        <button class="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                                                title="" data-original-title="Edit Client"><i class="fa fa-pencil"></i>
                                        </button>
                                        <button class="btn btn-xs btn-default" type="button" data-toggle="tooltip"
                                                title="" data-original-title="Remove Client"><i class="fa fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                            Showing <strong>1</strong>-<strong>10</strong> of <strong>40</strong></div>
                    </div>
                    <div class="col-sm-6">
                        <div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                            <ul class="pagination">
                                <li class="paginate_button previous disabled" aria-controls="DataTables_Table_0"
                                    tabindex="0" id="DataTables_Table_0_previous"><a href="#"><i
                                        class="fa fa-angle-left"></i></a></li>
                                <li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><a
                                        href="#">1</a></li>
                                <li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a
                                        href="#">2</a></li>
                                <li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a
                                        href="#">3</a></li>
                                <li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a
                                        href="#">4</a></li>
                                <li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0"
                                    id="DataTables_Table_0_next"><a href="#"><i class="fa fa-angle-right"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import moment from 'moment'
    export default {
        name: 'MyCreatedJobs',
        created: function () {
            this.$store.dispatch('fetchAllMyRelatedJobs')
        },
        computed: {
            ...mapState({
                relatedJobs: state => state.MyRelatedJobs
            }),
            jobs() {
                let filter = this.$route.params.filter
                let jobs = this.relatedJobs.data

                switch (filter) {
                    case 'all':
                        return jobs
                        break
                    case 'new' : return jobs.filter(job => job.status === 0)
                        break
                    case 'inprogress':
                        return jobs.filter(job => job.status === 1)
                        break
                    case 'resolved':
                        return jobs.filter(job => job.status === 2)
                        break
                    case 'out-of-date':
                        return jobs.filter(job => job.deadline.getTime() < new Date().getTime())
                        break
                }
            }
        },
        methods: {
            getPriority(job){
                switch (job.priority){
                    case 0 : return 'Thấp'
                        break
                    case 1 : return 'Bình thường'
                        break
                    case 2: return 'Cao'
                        break
                    case 3: return 'Khẩn cấp'
                }
            },
            getStatus(job){
                switch (job.status){
                    case 0 : return 'New'
                        break
                    case 1 : return 'Inprogress'
                        break
                    case 2: return 'Resolved'
                        break
                    case 3: return 'Feedback'
                        break
                    case 4: return 'Closed'
                        break
                    case 5: return 'Canceled'
                }
            },
            getTime(job){
                return moment(job.deathline).locale('vi').format('MMMM Do YYYY, h:mm:ss')
            }

        }
    }

</script>