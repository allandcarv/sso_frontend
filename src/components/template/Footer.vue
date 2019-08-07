<template>
    <footer class="footer">
        <span class="footer__span">Desenvolvido pelo Departamento de Informática do CEB</span>
        <div class="footer__icon">
            <a href="mailto:redes@ceb.unicamp.br">
                <i class="fa fa-envelope-o" />
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
                
        background-color: #365899;
   
    }

    .footer__span {
        color: #f2f2f2;
        font-weight: bold;
    }

    .footer__icon a,
    .footer__icon a:hover {
        margin-left: 20px;
        margin-right: 40px;
                
        color: #f2f2f2;
        font-size: 2.5rem;
        text-decoration: none;
    }
</style>
