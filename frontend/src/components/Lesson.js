const Lesson = ({ lesson }) => {
    return (
        <div className="lesson">

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p className="px-5 py-3 h5 fw-normal">{lesson.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt possimus soluta non assumenda inventore dolore a hic aliquam, quis aliquid porro voluptatum excepturi provident explicabo consequatur qui officia reprehenderit adipisci.</p>
                <iframe style={{ height: "450px", width: "800px" }} src={"https://www.youtube.com/embed/" + lesson.videoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <p className="px-5 py-3 h5 fw-normal">{lesson.readings} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias excepturi numquam voluptas, iste impedit rem placeat a. Possimus iure suscipit incidunt quidem quibusdam aut, tempora veritatis saepe provident! Perspiciatis minima, reprehenderit fugit accusamus doloremque eius saepe architecto? Et qui corporis iusto iure aliquid dolor? Quasi molestiae possimus, officia quis autem nostrum perferendis harum aspernatur placeat modi obcaecati dolores, odit ullam nobis. Temporibus nam placeat nobis itaque. Quibusdam perferendis omnis, quidem repellat aliquid, voluptas a porro ipsum reiciendis dolores neque, impedit quae obcaecati praesentium aut tempore dicta atque dolor enim! A inventore ex repudiandae, numquam quod optio amet adipisci praesentium quo? </p>

            </div>
        </div >
    );
}

export default Lesson;