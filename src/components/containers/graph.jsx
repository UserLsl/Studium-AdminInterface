import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";

export default props => {

    const [options, setOptions] = useState({
        title: ''
    });

    const [data, setData] = useState([
        ['Meses', 'Postagens'],
        ['', 10],
        ['', 20],
        ['', 30],
        ['', 40],
        ['', 50],
        ['', 50]
    ]);

    useEffect(() => {
        setData([
            ['Meses', 'Postagens'], 
            [getMonthWritten(new Date().getMonth() - 5), props.summation.mes5], 
            [getMonthWritten(new Date().getMonth() - 4), props.summation.mes4], 
            [getMonthWritten(new Date().getMonth() - 3), props.summation.mes3], 
            [getMonthWritten(new Date().getMonth() - 2), props.summation.mes2], 
            [getMonthWritten(new Date().getMonth() - 1), props.summation.mes1],
            [getMonthWritten(new Date().getMonth()), props.summation.mes0]
        ]);
    }, []);

    function getMonthWritten(number) {
        switch (number) {
            case 0: return 'Janeiro'
            case 1: return 'Fevereiro'
            case 2: return 'Março'
            case 3: return 'Abril'
            case 4: return 'Maio'
            case 5: return 'Junho'
            case 6: return 'Julho'
            case 7: return 'Agosto'
            case 8: return 'Setembro'
            case 9: return 'Outubro'
            case 12: return 'Novembro'
            case 11: return 'Dezembro'
        }
    }

    function getReportsSolved() {
        let count = 0;
        props.reports.map(report => {
            if(report.solved) {
                count++;
            }
        });
        return count;
    }

    function getUsersPosted() {
        let count = 0;
        props.users.map(user => {
            
            if(user.userPosts.length > 0) {
                count++;
            }
        });
        return count;
    }

    function getCategoriesUsed() {
        let count = 0;
        props.categories.map(category => {
            if(category.categoryPosts.length > 0) {
                count++;
            }
        });
        return count;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">Relatório em tela</h3>

                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                            </button>
                            <div className="btn-group">
                                <button type="button" className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-wrench"></i></button>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </div>
                            <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-8">
                                <p className="text-center">
                                    {/* <strong>{`Postagens realizadas: ${new Date().getDate()} de ${getMonthWritten(new Date().getMonth() - 5)}, ${new Date().getFullYear()} - ${new Date().getDate()} de ${getMonthWritten(new Date().getMonth())}, ${new Date().getFullYear()}`}</strong> */}
                                    <strong>{`Postagens realizadas: ${getMonthWritten(new Date().getMonth() - 5)} de ${new Date().getFullYear()} - ${getMonthWritten(new Date().getMonth())} de ${new Date().getFullYear()}`}</strong>
                                </p>

                                <div className="chart chart-style">
                                    <div className="col-sm-12 col-xs-12 chartItem-style">
                                        <Chart
                                            width={'100%'}
                                            height={'400px'}
                                            chartType="AreaChart"
                                            data={data}
                                            options={options}
                                        />
                                    </div>
                                    {/* <div class="col-md-6 chartItem-style">
                                        <Chart
                                            width={'390px'}
                                            height={'300px'}
                                            chartType="ColumnChart"
                                            data={data}
                                            options={options}
                                        />
                                    </div> */}
                                </div>

                            </div>
                            <div className="col-md-4">
                                <p className="text-center">
                                    <strong>Progresso de Metas</strong>
                                </p>

                                <div className="div-padding-top-style" style={{ paddingRight: '20px' }}>
                                    <div className="progress-group">
                                        <span className="progress-text">Denúncias Resolvidas</span>
                                        <span className="progress-number"><b>{getReportsSolved()}</b>/{props.reports.length}</span>

                                        <div className="progress sm">
                                            <div className="progress-bar progress-bar-aqua" style={{ width: `${(getReportsSolved() * 100) / props.reports.length}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="progress-group">
                                        <span className="progress-text">Usuários Cadastrados</span>
                                        <span className="progress-number"><b>{props.users.length}</b>/50</span>

                                        <div className="progress sm">
                                            <div className="progress-bar progress-bar-red" style={{ width: `${(props.users.length * 100) / 50}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="progress-group">
                                        <span className="progress-text">Usuários que Postaram</span>
                                        <span className="progress-number"><b>{getUsersPosted()}</b>/{props.users.length}</span>

                                        <div className="progress sm">
                                            <div className="progress-bar progress-bar-green" style={{ width: `${(getUsersPosted() * 100) / props.users.length}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="progress-group">
                                        <span className="progress-text">Categorias Utilizadas</span>
                                        <span className="progress-number"><b>{getCategoriesUsed()}</b>/{props.categories.length}</span>

                                        <div className="progress sm">
                                            <div className="progress-bar progress-bar-yellow" style={{ width: `${(getCategoriesUsed() * 100) / props.categories.length}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div class="box-footer">
                        <div class="row">
                            <div class="col-sm-3 col-xs-6">
                                <div class="description-block border-right">
                                    <span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 17%</span>
                                    <h5 class="description-header">$35,210.43</h5>
                                    <span class="description-text">TOTAL REVENUE</span>
                                </div>
                            </div>
                            <div class="col-sm-3 col-xs-6">
                                <div class="description-block border-right">
                                    <span class="description-percentage text-yellow"><i class="fa fa-caret-left"></i> 0%</span>
                                    <h5 class="description-header">$10,390.90</h5>
                                    <span class="description-text">TOTAL COST</span>
                                </div>
                            </div>
                            <div class="col-sm-3 col-xs-6">
                                <div class="description-block border-right">
                                    <span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 20%</span>
                                    <h5 class="description-header">$24,813.53</h5>
                                    <span class="description-text">TOTAL PROFIT</span>
                                </div>
                            </div>
                            <div class="col-sm-3 col-xs-6">
                                <div class="description-block">
                                    <span class="description-percentage text-red"><i class="fa fa-caret-down"></i> 18%</span>
                                    <h5 class="description-header">1200</h5>
                                    <span class="description-text">GOAL COMPLETIONS</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}












