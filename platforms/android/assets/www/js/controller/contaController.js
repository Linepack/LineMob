/* global Mustache, logUtil, mainController, alertUtil, daoUtil, Controller, iconUtil, i18next */

var contaController = {
    TEMPLATE_CADASTRO: "",
    TEMPLATE_LISTA: "",
    TEMPLATE_EDICAO: "",
    loadList: function (cb) {


        Controller.loadList({
            controllerOrigin: this,
            entity: new Conta(),
            orderBy: "nome",
            template: contaController.TEMPLATE_LISTA,
            navLeft: {
                icon: iconUtil.back,
                callbackClick: function () {
                    mainController.render();
                }
            },
            navCenter: {
                title: i18next.t("conta-controller.plural"),
                icon: ""
            },
            floatButton: {
                display: "block",
                callbackAdd: function () {
                    contaController.loadNewOrSingleEdit();
                }
            }
        }, function () {
            if (cb) {
                cb();
            }
        });
    },
    loadNewOrSingleEdit: function (data, cb) {
        Controller.loadNewOrSingleEdit({
            controllerOrigin: contaController,
            entity: new Conta(),
            template: contaController.TEMPLATE_CADASTRO,
            navLeft: {
                icon: iconUtil.back,
                callbackClick: function () {
                    contaController.loadList();
                }
            },
            navCenter: {
                title: i18next.t("conta-controller.singular"),
                icon: (data) ? iconUtil.edit : iconUtil.add
            },
            inputToFocus: "#nome"
        }, data, function () {
            if (cb) {
                cb();
            }
        });
    },
    loadMultipleEdit: function (data, cb) {
        Controller.loadMultipleEdit({
            controllerOrigin: contaController,
            entity: new Conta(),
            template: contaController.TEMPLATE_EDICAO,
            navLeft: {
                icon: iconUtil.back,
                callbackClick: function () {
                    contaController.loadList();
                }
            },
            navCenter: {
                title: i18next.t("conta-controller.plural"),
                icon: iconUtil.edit
            }
        }, data, function () {
            if (cb) {
                cb();
            }
        });
    },
    selecionaCampoEdicaoMultipla: function () {
        var campo = $("#select-campo").val();

        $("#valor-campo").val("");

        if (campo === "valorSaldoInicial") {
            $("#valor-campo").mask("000000000.00", {reverse: true});
        } else {
            $("#valor-campo").unmask();
        }

        if (campo === "nome") {
            $("#prompt-campo").html(i18next.t("conta-controller.field-nome"));
            $("#valor-campo").prop("name", "nome");
            $("#valor-campo").prop("type", "text");
        } else if (campo === "dataFundacao") {
            $("#prompt-campo").html(i18next.t("conta-controller.field-dataFundacao"));
            $("#valor-campo").prop("name", "dataFundacao");
            $("#valor-campo").prop("type", "date");
        } else if (campo === "valorSaldoInicial") {
            $("#prompt-campo").html(i18next.t("conta-controller.field-valorSaldoInicial"));
            $("#valor-campo").prop("name", "valorSaldoInicial");
            $("#valor-campo").prop("type", "tel");
        }
        $("#prompt-campo").addClass("active");
    },
    validaFormulario: function (conta, cb, field) {
        if (!field) {
            if (!conta.nome) {
                alertUtil.confirm(i18next.t("conta-controller.alert-nome-req"));
            } else if (!conta.dataFundacao) {
                alertUtil.confirm(i18next.t("conta-controller.alert-dataFundacao-req"));
            } else if (!conta.valorSaldoInicial) {
                alertUtil.confirm(i18next.t("conta-controller.alert-valorSaldoInicial-req"));
            } else {
                if (cb) {
                    cb();
                }
            }
        } else {
            if (cb) {
                cb();
            }
        }
    },
    loadNewModal: function (element, callbackAction) {
        Controller.loadNewModal({
            controllerModal: contaController,
            entity: new Conta(),
            element: element,
            templateCadastro: contaController.TEMPLATE_CADASTRO,
            tituloNavCenter: i18next.t("conta-controller.singular"),
            columnToReRender: "nome",
            orderByReRender: "nome",
            callbackAction: function () {
                if (callbackAction) {
                    callbackAction();
                }
            },
            labelSelect: i18next.t("conta-controller.field-select-conta")
        });
    }
}; 