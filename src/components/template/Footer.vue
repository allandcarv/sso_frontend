<template>
    <footer class="footer">
        <span class="footer__span">Desenvolvido pelo Departamento de Informática do CEB</span>
        <div class="footer__icon">
            <a href="mailto:redes@ceb.unicamp.br">
                <font-awesome-icon icon="envelope-square"></font-awesome-icon>
            </a>
        </div>
    </footer>    
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        
        -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
        -moz-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
        
        padding: 40px;
    }

    .footer__span {
        color: #4dab23;
        font-weight: bold;
    }

    .footer__icon a{
        margin-left: 20px;
        color: #4dab23;

        font-size: 2.5rem;
        text-decoration: none;
    }
</style>
